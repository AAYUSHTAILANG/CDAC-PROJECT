using System;
using System.Collections.Generic;

namespace PgExplorer.Models;

public partial class Facility
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public virtual ICollection<PropertyFacility> PropertyFacilities { get; set; } = new List<PropertyFacility>();
}
