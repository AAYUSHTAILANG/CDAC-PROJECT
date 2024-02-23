using System;
using System.Collections.Generic;

namespace PgExplorer.Models;

public partial class PropertyFacility
{
    public int Id { get; set; }

    public int? PropertyId { get; set; }

    public int? FacilityId { get; set; }

    public virtual Facility? Facility { get; set; }

    public virtual Property? Property { get; set; }
}
