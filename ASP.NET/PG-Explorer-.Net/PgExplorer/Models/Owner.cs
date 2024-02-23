using System;
using System.Collections.Generic;

namespace PgExplorer.Models;

public partial class Owner
{
    public int OwnerId { get; set; }

    public string OwnerFname { get; set; } = null!;

    public string OwnerLname { get; set; } = null!;

    public string OwnerEmail { get; set; } = null!;

    public string? Contact { get; set; }

    public string? OwnerAadhar { get; set; }

    public string OwnerAddress { get; set; } = null!;

    public int? UserId { get; set; }

    public int? AreaId { get; set; }

    public virtual Area? Area { get; set; }

    public virtual ICollection<Property> Properties { get; set; } = new List<Property>();

    public virtual User? User { get; set; }
}
