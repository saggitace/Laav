import { hashPassword, comparePassword } from '../utils/password';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import { generateTenantId } from '../utils/helpers';
import { dbService } from './database.service';

export class AuthService {
  async registerTenant(data: any) {
    try {
      const User = dbService.getMainModel('User');
      const Tenant = dbService.getMainModel('Tenant');
      const RefreshToken = dbService.getMainModel('RefreshToken');

      // Check if user already exists
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser) {
        throw new Error('User already registered');
      }

      // Create tenant
      const tenantId = generateTenantId();
      const tenant = await Tenant.create({
        _id: tenantId,
        name: data.tenantName,
        slug: data.tenantName.toLowerCase().replace(/\s+/g, '-'),
        email: data.email,
      });

      // Initialize tenant database
      await dbService.initializeTenantDB(tenantId);

      // Hash password
      const hashedPassword = await hashPassword(data.password);

      // Create user
      const user = await User.create({
        tenantId,
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        role: 'admin',
        verified: true,
      });

      // Generate tokens
      const accessToken = generateAccessToken({
        id: user._id,
        tenantId,
        email: user.email,
        role: user.role,
      });

      const refreshToken = generateRefreshToken({
        id: user._id,
        tenantId,
        email: user.email,
        role: user.role,
      });

      // Save refresh token
      await RefreshToken.create({
        userId: user._id,
        tenantId,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

      return {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          tenantId,
        },
        tenant: {
          id: tenant._id,
          name: tenant.name,
          slug: tenant.slug,
        },
        accessToken,
        refreshToken,
      };
    } catch (error: any) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  }

  async login(email: string, password: string, tenantId: string) {
    try {
      const User = dbService.getMainModel('User');
      const RefreshToken = dbService.getMainModel('RefreshToken');

      // Find user
      const user = await User.findOne({ email, tenantId });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Check password
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Generate tokens
      const accessToken = generateAccessToken({
        id: user._id,
        tenantId: user.tenantId,
        email: user.email,
        role: user.role,
      });

      const refreshToken = generateRefreshToken({
        id: user._id,
        tenantId: user.tenantId,
        email: user.email,
        role: user.role,
      });

      // Save refresh token
      await RefreshToken.create({
        userId: user._id,
        tenantId,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

      return {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          tenantId: user.tenantId,
        },
        accessToken,
        refreshToken,
      };
    } catch (error: any) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  async verifyRefreshToken(token: string, tenantId: string) {
    try {
      const RefreshToken = dbService.getMainModel('RefreshToken');

      const tokenRecord = await RefreshToken.findOne({
        token,
        tenantId,
        expiresAt: { $gt: new Date() },
      });

      if (!tokenRecord) {
        throw new Error('Invalid or expired refresh token');
      }

      const User = dbService.getMainModel('User');
      const user = await User.findById(tokenRecord.userId);

      if (!user) {
        throw new Error('User not found');
      }

      // Generate new access token
      const accessToken = generateAccessToken({
        id: user._id,
        tenantId: user.tenantId,
        email: user.email,
        role: user.role,
      });

      return { accessToken };
    } catch (error: any) {
      throw new Error(`Token refresh failed: ${error.message}`);
    }
  }

  async logout(userId: string, tenantId: string) {
    try {
      const RefreshToken = dbService.getMainModel('RefreshToken');
      await RefreshToken.deleteMany({ userId, tenantId });
      return { success: true };
    } catch (error: any) {
      throw new Error(`Logout failed: ${error.message}`);
    }
  }
}

export const authService = new AuthService();
