import { Blog } from '../models/index.js';
import { AppError } from '../middleware/errorHandler.js';

// @desc    Get all blog posts
// @route   GET /api/blog
export const getBlogs = async (req, res, next) => {
  try {
    const { status, tag, limit = 10, page = 1 } = req.query;
    const filter = {};

    // Admin can see all, public only published
    if (!req.user) {
      filter.status = 'PUBLISHED';
    } else if (status) {
      filter.status = status;
    }

    if (tag) {
      filter.tags = tag;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .populate('author', 'fullName email')
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Blog.countDocuments(filter),
    ]);

    res.json({
      success: true,
      count: blogs.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog post
// @route   GET /api/blog/:slug
export const getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
      .populate('author', 'fullName email');

    if (!blog) {
      throw new AppError('Blog post not found', 404);
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create blog post
// @route   POST /api/blog
export const createBlog = async (req, res, next) => {
  try {
    const { title, content, excerpt, status, tags, metaTitle, metaDescription, metaKeywords } = req.body;

    if (!title || !content) {
      throw new AppError('Title and content are required', 400);
    }

    const blog = await Blog.create({
      title,
      content,
      excerpt,
      status: status || 'DRAFT',
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      author: req.user._id,
      metaTitle,
      metaDescription,
      metaKeywords: metaKeywords ? metaKeywords.split(',').map(k => k.trim()) : [],
      publishedAt: status === 'PUBLISHED' ? new Date() : undefined,
    });

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog post
// @route   PUT /api/blog/:id
export const updateBlog = async (req, res, next) => {
  try {
    const { title, content, excerpt, status, tags, metaTitle, metaDescription, metaKeywords } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      throw new AppError('Blog post not found', 404);
    }

    if (title) blog.title = title;
    if (content) blog.content = content;
    if (excerpt !== undefined) blog.excerpt = excerpt;
    if (status) {
      blog.status = status;
      if (status === 'PUBLISHED' && blog.status !== 'PUBLISHED') {
        blog.publishedAt = new Date();
      }
    }
    if (tags) blog.tags = tags.split(',').map(t => t.trim());
    if (metaTitle !== undefined) blog.metaTitle = metaTitle;
    if (metaDescription !== undefined) blog.metaDescription = metaDescription;
    if (metaKeywords !== undefined) blog.metaKeywords = metaKeywords ? metaKeywords.split(',').map(k => k.trim()) : [];

    await blog.save();

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      throw new AppError('Blog post not found', 404);
    }

    await blog.deleteOne();

    res.json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
