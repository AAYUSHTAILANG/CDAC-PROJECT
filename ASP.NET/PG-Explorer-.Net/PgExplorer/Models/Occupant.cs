using System;
using System.Collections.Generic;

namespace PgExplorer.Models;

public partial class Occupant
{
    public int OccupantId { get; set; }

    public string OccupantFname { get; set; } = null!;

    public string OccupantLname { get; set; } = null!;

    public string OccupantEmail { get; set; } = null!;

    public string? OccupantContact { get; set; }

    public string OccupantGender { get; set; } = null!;

    public string OccupantProfession { get; set; } = null!;

    public string? OccupantAddress { get; set; }

    public string OccupantAadhar { get; set; } = null!;

    public string AlternateContact { get; set; } = null!;

    public int? UserId { get; set; }

    public int? AreaId { get; set; }

    public virtual Area? Area { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual ICollection<OccupantApproval> OccupantApprovals { get; set; } = new List<OccupantApproval>();

    public virtual User? User { get; set; }
}
