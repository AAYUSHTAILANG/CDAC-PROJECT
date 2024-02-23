using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace PgExplorer.Models;

public partial class PgexpContext : DbContext
{
    public PgexpContext()
    {
    }

    public PgexpContext(DbContextOptions<PgexpContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Area> Areas { get; set; }

    public virtual DbSet<Booking> Bookings { get; set; }

    public virtual DbSet<City> Cities { get; set; }

    public virtual DbSet<Facility> Facilities { get; set; }

    public virtual DbSet<Occupant> Occupants { get; set; }

    public virtual DbSet<OccupantApproval> OccupantApprovals { get; set; }

    public virtual DbSet<Owner> Owners { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Property> Properties { get; set; }

    public virtual DbSet<PropertyFacility> PropertyFacilities { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=root;database=pgexp", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.31-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Area>(entity =>
        {
            entity.HasKey(e => e.AreaId).HasName("PRIMARY");

            entity.ToTable("area");

            entity.HasIndex(e => e.AreaId, "area_id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.CityId, "city_id_idx");

            entity.HasIndex(e => e.Pincode, "pincode_UNIQUE").IsUnique();

            entity.Property(e => e.AreaId).HasColumnName("area_id");
            entity.Property(e => e.AreaName)
                .HasMaxLength(45)
                .HasColumnName("area_name");
            entity.Property(e => e.CityId).HasColumnName("city_id");
            entity.Property(e => e.Pincode).HasColumnName("pincode");

            entity.HasOne(d => d.City).WithMany(p => p.Areas)
                .HasForeignKey(d => d.CityId)
                .HasConstraintName("city_id");
        });

        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("booking");

            entity.HasIndex(e => e.OccupantId, "fk_occ_id_idx");

            entity.HasIndex(e => e.PropertyId, "fk_prop_id_idx");

            entity.HasIndex(e => e.Id, "id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.TransactionId, "transaction_id_UNIQUE").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Date)
                .HasMaxLength(255)
                .HasColumnName("date");
            entity.Property(e => e.Deposit)
                .HasMaxLength(45)
                .HasColumnName("deposit");
            entity.Property(e => e.From).HasColumnName("from");
            entity.Property(e => e.OccupantId).HasColumnName("occupant_id");
            entity.Property(e => e.PropertyId).HasColumnName("property_id");
            entity.Property(e => e.ToApprox).HasColumnName("to(approx)");
            entity.Property(e => e.TransactionId)
                .HasMaxLength(45)
                .HasColumnName("transaction_id");

            entity.HasOne(d => d.Occupant).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.OccupantId)
                .HasConstraintName("FKgwd9cmb2qy3mrke0l1ob5xoxw");

            entity.HasOne(d => d.Property).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.PropertyId)
                .HasConstraintName("FKbcgr7a3utjxb9n6ltvw0w6xqs");
        });

        modelBuilder.Entity<City>(entity =>
        {
            entity.HasKey(e => e.CityId).HasName("PRIMARY");

            entity.ToTable("cities");

            entity.HasIndex(e => e.CityId, "city_id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.CityName, "city_name_UNIQUE").IsUnique();

            entity.Property(e => e.CityId).HasColumnName("city_id");
            entity.Property(e => e.CityName)
                .HasMaxLength(45)
                .HasColumnName("city_name");
        });

        modelBuilder.Entity<Facility>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("facility");

            entity.HasIndex(e => e.Id, "id_UNIQUE").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Description)
                .HasMaxLength(300)
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(45)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Occupant>(entity =>
        {
            entity.HasKey(e => e.OccupantId).HasName("PRIMARY");

            entity.ToTable("occupant");

            entity.HasIndex(e => e.AreaId, "UK_ql7kab6wdypv5hfby3s2cwx6s").IsUnique();

            entity.HasIndex(e => e.AlternateContact, "alternate_contact_UNIQUE").IsUnique();

            entity.HasIndex(e => e.OccupantEmail, "email_UNIQUE").IsUnique();

            entity.HasIndex(e => e.OccupantAadhar, "occupant_aadhar_UNIQUE").IsUnique();

            entity.HasIndex(e => e.OccupantId, "occupant_id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.UserId, "user_id_idx");

            entity.Property(e => e.OccupantId).HasColumnName("occupant_id");
            entity.Property(e => e.AlternateContact)
                .HasMaxLength(45)
                .HasColumnName("alternate_contact");
            entity.Property(e => e.AreaId).HasColumnName("area_id");
            entity.Property(e => e.OccupantAadhar)
                .HasMaxLength(50)
                .HasColumnName("occupant_aadhar");
            entity.Property(e => e.OccupantAddress)
                .HasMaxLength(255)
                .HasColumnName("occupant_address");
            entity.Property(e => e.OccupantContact)
                .HasMaxLength(255)
                .HasColumnName("occupant_contact");
            entity.Property(e => e.OccupantEmail)
                .HasMaxLength(45)
                .HasColumnName("occupant_email");
            entity.Property(e => e.OccupantFname)
                .HasMaxLength(45)
                .HasColumnName("occupant_fname");
            entity.Property(e => e.OccupantGender)
                .HasMaxLength(10)
                .HasColumnName("occupant_gender");
            entity.Property(e => e.OccupantLname)
                .HasMaxLength(45)
                .HasColumnName("occupant_lname");
            entity.Property(e => e.OccupantProfession)
                .HasMaxLength(45)
                .HasColumnName("occupant_profession");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Area).WithOne(p => p.Occupant)
                .HasForeignKey<Occupant>(d => d.AreaId)
                .HasConstraintName("FKa0k1fvlv1ltg42gvaeyqvi1d4");

            entity.HasOne(d => d.User).WithMany(p => p.Occupants)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("user_id");
        });

        modelBuilder.Entity<OccupantApproval>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("occupant_approval");

            entity.HasIndex(e => e.OccupantId, "fk_occ_id_idx");

            entity.HasIndex(e => e.PropertyId, "fk_prop_id_idx");

            entity.HasIndex(e => e.Id, "id_UNIQUE").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ApprovalStatus).HasColumnName("approval_status");
            entity.Property(e => e.OccupantId).HasColumnName("occupant_id");
            entity.Property(e => e.PropertyId).HasColumnName("property_id");
            entity.Property(e => e.RequestDate)
                .HasMaxLength(255)
                .HasColumnName("request_date");

            entity.HasOne(d => d.Occupant).WithMany(p => p.OccupantApprovals)
                .HasForeignKey(d => d.OccupantId)
                .HasConstraintName("fk_occ_id");

            entity.HasOne(d => d.Property).WithMany(p => p.OccupantApprovals)
                .HasForeignKey(d => d.PropertyId)
                .HasConstraintName("fk_prop_id");
        });

        modelBuilder.Entity<Owner>(entity =>
        {
            entity.HasKey(e => e.OwnerId).HasName("PRIMARY");

            entity.ToTable("owner");

            entity.HasIndex(e => e.AreaId, "UK_itiatao4y4yq0tm2v0dbrk6vo").IsUnique();

            entity.HasIndex(e => e.Contact, "contact_UNIQUE").IsUnique();

            entity.HasIndex(e => e.OwnerAadhar, "owner_aadhar_UNIQUE").IsUnique();

            entity.HasIndex(e => e.OwnerEmail, "owner_email_UNIQUE").IsUnique();

            entity.HasIndex(e => e.OwnerId, "owner_id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.UserId, "owner_id_idx");

            entity.Property(e => e.OwnerId).HasColumnName("owner_id");
            entity.Property(e => e.AreaId).HasColumnName("area_id");
            entity.Property(e => e.Contact)
                .HasMaxLength(45)
                .HasColumnName("contact");
            entity.Property(e => e.OwnerAadhar)
                .HasMaxLength(45)
                .HasColumnName("owner_aadhar");
            entity.Property(e => e.OwnerAddress)
                .HasMaxLength(45)
                .HasColumnName("owner_address");
            entity.Property(e => e.OwnerEmail)
                .HasMaxLength(45)
                .HasColumnName("owner_email");
            entity.Property(e => e.OwnerFname)
                .HasMaxLength(45)
                .HasColumnName("owner_fname");
            entity.Property(e => e.OwnerLname)
                .HasMaxLength(45)
                .HasColumnName("owner_lname");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Area).WithOne(p => p.Owner)
                .HasForeignKey<Owner>(d => d.AreaId)
                .HasConstraintName("FK64s79djvt15hon717imrighul");

            entity.HasOne(d => d.User).WithMany(p => p.Owners)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("owner_id");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("payment");

            entity.HasIndex(e => e.BookingId, "fk_booking_id_idx");

            entity.HasIndex(e => e.OccId, "fk_occ_id_idx");

            entity.HasIndex(e => e.Id, "id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.TransactionId, "transaction_id_UNIQUE").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Amount).HasColumnName("amount");
            entity.Property(e => e.BookingId).HasColumnName("booking_id");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.Mode)
                .HasMaxLength(50)
                .HasColumnName("mode");
            entity.Property(e => e.OccId).HasColumnName("occ_id");
            entity.Property(e => e.TransactionId)
                .HasMaxLength(45)
                .HasColumnName("transaction_id");
        });

        modelBuilder.Entity<Property>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("property");

            entity.HasIndex(e => e.AreaId, "fk_area_id_idx");

            entity.HasIndex(e => e.OwnerId, "fk_owner_id_idx");

            entity.HasIndex(e => e.Id, "id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Name, "name_UNIQUE").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(500)
                .HasColumnName("address");
            entity.Property(e => e.AreaId).HasColumnName("area_id");
            entity.Property(e => e.Capacity).HasColumnName("capacity");
            entity.Property(e => e.Name)
                .HasMaxLength(45)
                .HasColumnName("name");
            entity.Property(e => e.NoOfOccupants).HasColumnName("no_of_occupants");
            entity.Property(e => e.OwnerId).HasColumnName("owner_id");
            entity.Property(e => e.Price).HasColumnName("price");

            entity.HasOne(d => d.Area).WithMany(p => p.Properties)
                .HasForeignKey(d => d.AreaId)
                .HasConstraintName("fk_area_id");

            entity.HasOne(d => d.Owner).WithMany(p => p.Properties)
                .HasForeignKey(d => d.OwnerId)
                .HasConstraintName("fk_owner_id");
        });

        modelBuilder.Entity<PropertyFacility>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("property_facility");

            entity.HasIndex(e => e.FacilityId, "fk_fac_id_idx");

            entity.HasIndex(e => e.PropertyId, "fk_facility_id_idx");

            entity.HasIndex(e => e.Id, "id_UNIQUE").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FacilityId).HasColumnName("facility_id");
            entity.Property(e => e.PropertyId).HasColumnName("property_id");

            entity.HasOne(d => d.Facility).WithMany(p => p.PropertyFacilities)
                .HasForeignKey(d => d.FacilityId)
                .HasConstraintName("fk_fac_id");

            entity.HasOne(d => d.Property).WithMany(p => p.PropertyFacilities)
                .HasForeignKey(d => d.PropertyId)
                .HasConstraintName("FKs4q7v9o9en1gje5q1tpi5c32v");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PRIMARY");

            entity.ToTable("roles");

            entity.HasIndex(e => e.RoleId, "role_id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.RoleName, "role_name_UNIQUE").IsUnique();

            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.RoleName)
                .HasMaxLength(45)
                .HasColumnName("role_name");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.ToTable("users");

            entity.HasIndex(e => e.RoleId, "fkrid");

            entity.HasIndex(e => e.UserEmail, "user_email_UNIQUE").IsUnique();

            entity.HasIndex(e => e.UserId, "user_id_UNIQUE").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.UserActiveStatus)
                .HasColumnType("bit(1)")
                .HasColumnName("user_active_status");
            entity.Property(e => e.UserEmail)
                .HasMaxLength(45)
                .HasColumnName("user_email");
            entity.Property(e => e.UserPassword)
                .HasMaxLength(45)
                .HasColumnName("user_password");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("fkrid");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
