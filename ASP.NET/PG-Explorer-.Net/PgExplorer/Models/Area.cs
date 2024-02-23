using System;
using System.Collections.Generic;

namespace PgExplorer.Models;

public partial class Area
{
    public int AreaId { get; set; }

    public string AreaName { get; set; } = null!;

    public int Pincode { get; set; }

    public int? CityId { get; set; }

    public virtual City? City { get; set; }

    public virtual Occupant? Occupant { get; set; }

    public virtual Owner? Owner { get; set; }

    public virtual ICollection<Property> Properties { get; set; } = new List<Property>();
}
