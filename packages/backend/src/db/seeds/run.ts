import dbConnection from '..';
import { logger } from '../../utils/logger';

/**
 * Seed the database with initial data
 */
const seedDatabase = async (): Promise<void> => {
  logger.info('Seeding database...');
  
  try {
    const db = await dbConnection.initialize();
    
    // Begin transaction
    await db.exec('BEGIN TRANSACTION');
    
    try {
      // Clear existing data
      await db.exec('DELETE FROM subtasks');
      await db.exec('DELETE FROM tasks');
      
      // Reset auto-increment counters
      await db.exec('DELETE FROM sqlite_sequence WHERE name="tasks" OR name="subtasks"');
      
      // Insert sample tasks
      const now = new Date().toISOString();
      
      // Task 1
      await db.run(`
        INSERT INTO tasks (title, description, status, priority, dueDate, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, 
        'Build React component library',
        'Create a reusable component library for the frontend',
        'pending',
        'high',
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        now,
        now
      );
      
      // Task 2
      await db.run(`
        INSERT INTO tasks (title, description, status, priority, dueDate, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, 
        'Set up CI/CD pipeline',
        'Configure GitHub Actions for continuous integration and deployment',
        'pending',
        'medium',
        new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
        now,
        now
      );
      
      // Task 3
      await db.run(`
        INSERT INTO tasks (title, description, status, priority, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?)
      `, 
        'Write API documentation',
        'This is a misleading description, only use the title for generating subtasks',
        'pending',
        'low',
        now,
        now
      );
      
      // Commit transaction
      await db.exec('COMMIT');
      
      logger.info('Database seeded successfully');
    } catch (error) {
      // Rollback transaction on error
      await db.exec('ROLLBACK');
      throw error;
    }
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeds if this file is executed directly
if (require.main === module) {
  seedDatabase().catch(error => {
    logger.error('Unhandled error during seeding:', error);
    process.exit(1);
  });
}

export default seedDatabase;