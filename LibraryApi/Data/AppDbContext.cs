using LibraryApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Book> Books { get; set; }

    public DbSet<Category> Categories { get; set; }

    public DbSet<Loan> Loans { get; set; }

    public DbSet<AppUser> AppUsers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Roman" },
            new Category { Id = 2, Name = "Fakta" },
            new Category { Id = 3, Name = "Fantasy" }
        );

        modelBuilder.Entity<Book>().HasData(
            new Book
            {
                Id = 1,
                Title = "Harry Potter",
                Author = "J.K. Rowling",
                Year = 1997,
                Genre = "Fantasy",
                IsAvailable = true,
                CategoryId = 3
            },
            new Book
            {
                Id = 2,
                Title = "Sapiens",
                Author = "Yuval Noah Harari",
                Year = 2011,
                Genre = "Fakta",
                IsAvailable = true,
                CategoryId = 2
            }
        );

        modelBuilder.Entity<AppUser>().HasData(
            new AppUser
            {
                Id = 1,
                Username = "admin",
                PasswordHash = "admin123",
                Role = "Admin"
            },
            new AppUser
            {
                Id = 2,
                Username = "user",
                PasswordHash = "user123",
                Role = "User"
            }
        );
    }
}