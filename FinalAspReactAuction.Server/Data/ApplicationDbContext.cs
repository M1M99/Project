﻿using FinalAspReactAuction.Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinalAspReactAuction.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
         : base(options)
        {
        }

        public DbSet<Make> Makes { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Car> Cars { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Car>().Property(p => p.Price).HasColumnType("money");
                modelBuilder.Entity<Car>().HasOne(a => a.Model).WithMany(a => a.Cars)
                //.OnDelete(DeleteBehavior.Cascade);
                .OnDelete(DeleteBehavior.Restrict);

        }

    }
}
