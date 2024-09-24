using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<User>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<Favorite> Favorites { get; set; }

        public DbSet<TouristSpot> TouristSpots { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

             builder.Entity<Favorite>()
            .HasKey(f => f.Id);

            builder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany(u => u.Comments)
                .HasForeignKey(c => c.UserId);

            builder.Entity<Favorite>()
                .HasOne(f => f.User)
                .WithMany(u => u.Favorites)
                .HasForeignKey(f => f.UserId);

            builder.Entity<Favorite>()
                .HasOne(f => f.TouristSpot)
                .WithMany(ts => ts.Favorites)
                .HasForeignKey(f => f.TouristSpotId);

            List<IdentityRole> roles = new List<IdentityRole>
        {
            new IdentityRole {
                Name = "Admin",
                NormalizedName = "ADMIN"
            },
            new IdentityRole {
                Name = "User",
                NormalizedName = "USER"
            }
        };
            builder.Entity<IdentityRole>().HasData(roles);

        }

    }
}