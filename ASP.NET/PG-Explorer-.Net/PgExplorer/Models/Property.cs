using System;
using System.Collections.Generic;

namespace PgExplorer.Models;

public partial class Property
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int? AreaId { get; set; }

    public string Address { get; set; } = null!;

    public int Price { get; set; }

    public int Capacity { get; set; }

    public int NoOfOccupants { get; set; }

    public int? OwnerId { get; set; }

    public virtual Area? Area { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual ICollection<OccupantApproval> OccupantApprovals { get; set; } = new List<OccupantApproval>();

    public virtual Owner? Owner { get; set; }

    public virtual ICollection<PropertyFacility> PropertyFacilities { get; set; } = new List<PropertyFacility>();
}
