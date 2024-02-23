using System;
using System.Collections.Generic;

namespace PgExplorer.Models;

public partial class User
{
    public int UserId { get; set; }

    public string UserEmail { get; set; } = null!;

    public string UserPassword { get; set; } = null!;

    public ulong? UserActiveStatus { get; set; }

    public int? RoleId { get; set; }

    public virtual ICollection<Occupant> Occupants { get; set; } = new List<Occupant>();

    public virtual ICollection<Owner> Owners { get; set; } = new List<Owner>();

    public virtual Role? Role { get; set; }
}
