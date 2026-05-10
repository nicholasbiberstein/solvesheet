// ================================================================
// CE371 — Soil Mechanics and Foundation Engineering
// Complete equation set from CE371 Exam Reference Sheet
// Every equation is fully algebraic — all variables solvable.
// To update: edit ONLY this file, then push to GitHub.
// ================================================================

window.COURSE_CE371 = {
  id:          "ce371",
  code:        "CE371",
  name:        "Soil Mechanics & Foundations",
  description: "Phase relationships, consolidation, stress, bearing capacity, deep foundations",

  tabs: [

    // ═══════════════════════════════════════════════════════════════
    // TAB 1 — PHASE RELATIONSHIPS
    // Unit weights, void ratio, porosity, water content, saturation
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "phase",
      title: "Phase Relationships",
      desc:  "Unit weights, void ratio, porosity, water content, specific gravity, saturation",
      equations: [

        // ── Total Unit Weight ────────────────────────────────────
        {
          id:"gamma_total", name:"Total Unit Weight",
          formula:"gamma = W / V",
          desc:"Total weight of soil mass divided by total volume. (CE371 Ref p.1)",
          ref:"CE371 Ref p.1",
          vars:{
            "gamma":{ sym:"γ",  desc:"Total unit weight",  units:["lb/ft3","kN/m3"], toBase:[1, 6.366] },
            "W":    { sym:"W",  desc:"Total weight",        units:["lb","kN"],        toBase:[1, 224.809] },
            "V":    { sym:"V",  desc:"Total volume",        units:["ft3","m3"],        toBase:[1, 35.3147] }
          },
          solvers:{
            "gamma": v=>({ val:v.W/v.V,       rearr:"γ = W / V",   sub:"W="+fN(v.W)+", V="+fN(v.V) }),
            "W":     v=>({ val:v.gamma*v.V,   rearr:"W = γ × V",   sub:"γ="+fN(v.gamma)+", V="+fN(v.V) }),
            "V":     v=>({ val:v.W/v.gamma,   rearr:"V = W / γ",   sub:"W="+fN(v.W)+", γ="+fN(v.gamma) })
          }
        },

        // ── Dry Unit Weight ──────────────────────────────────────
        {
          id:"gamma_dry", name:"Dry Unit Weight",
          formula:"gamma_d = Ws / V",
          desc:"Weight of solids only divided by total volume. (CE371 Ref p.1)",
          ref:"CE371 Ref p.1",
          vars:{
            "gd": { sym:"γ_d", desc:"Dry unit weight",   units:["lb/ft3","kN/m3"], toBase:[1, 6.366] },
            "Ws": { sym:"Ws",  desc:"Weight of solids",  units:["lb","kN"],         toBase:[1, 224.809] },
            "V":  { sym:"V",   desc:"Total volume",       units:["ft3","m3"],         toBase:[1, 35.3147] }
          },
          solvers:{
            "gd": v=>({ val:v.Ws/v.V,   rearr:"γ_d = Ws / V",   sub:"Ws="+fN(v.Ws)+", V="+fN(v.V) }),
            "Ws": v=>({ val:v.gd*v.V,   rearr:"Ws = γ_d × V",   sub:"γ_d="+fN(v.gd)+", V="+fN(v.V) }),
            "V":  v=>({ val:v.Ws/v.gd,  rearr:"V = Ws / γ_d",   sub:"Ws="+fN(v.Ws)+", γ_d="+fN(v.gd) })
          }
        },

        // ── Saturated Unit Weight ────────────────────────────────
        {
          id:"gamma_sat", name:"Saturated Unit Weight",
          formula:"gamma_sat = (Gs + e) / (1 + e) * gamma_w",
          desc:"Unit weight when all voids are filled with water. γ_w = 62.4 lb/ft³ or 9.81 kN/m³. (CE371 Ref p.1)",
          ref:"CE371 Ref p.1",
          vars:{
            "gsat": { sym:"γ_sat", desc:"Saturated unit weight",      units:["lb/ft3","kN/m3"], toBase:[1, 6.366] },
            "Gs":   { sym:"Gs",    desc:"Specific gravity of solids",  units:["dimensionless"],   toBase:[1] },
            "e":    { sym:"e",     desc:"Void ratio",                  units:["dimensionless"],   toBase:[1] },
            "gw":   { sym:"γ_w",   desc:"Unit weight of water",        units:["lb/ft3","kN/m3"], toBase:[1, 6.366] }
          },
          solvers:{
            "gsat": v=>({ val:(v.Gs+v.e)/(1+v.e)*v.gw,              rearr:"γ_sat = (Gs+e)/(1+e) × γ_w",      sub:"Gs="+fN(v.Gs)+", e="+fN(v.e)+", γ_w="+fN(v.gw) }),
            "Gs":   v=>({ val:v.gsat*(1+v.e)/v.gw - v.e,            rearr:"Gs = γ_sat×(1+e)/γ_w − e",        sub:"γ_sat="+fN(v.gsat)+", e="+fN(v.e)+", γ_w="+fN(v.gw) }),
            "e":    v=>({ val:(v.gw*v.Gs - v.gsat)/(v.gsat - v.gw), rearr:"e = (γ_w×Gs − γ_sat)/(γ_sat − γ_w)", sub:"γ_sat="+fN(v.gsat)+", Gs="+fN(v.Gs)+", γ_w="+fN(v.gw) }),
            "gw":   v=>({ val:v.gsat*(1+v.e)/(v.Gs+v.e),            rearr:"γ_w = γ_sat×(1+e)/(Gs+e)",        sub:"γ_sat="+fN(v.gsat)+", Gs="+fN(v.Gs)+", e="+fN(v.e) })
          }
        },

        // ── Effective (Submerged) Unit Weight ────────────────────
        {
          id:"gamma_prime", name:"Effective (Submerged) Unit Weight",
          formula:"gamma' = gamma_sat - gamma_w",
          desc:"Buoyant unit weight of soil below the water table. (CE371 Ref p.1)",
          ref:"CE371 Ref p.1",
          vars:{
            "gp":   { sym:"γ'",    desc:"Effective unit weight",   units:["lb/ft3","kN/m3"], toBase:[1, 6.366] },
            "gsat": { sym:"γ_sat", desc:"Saturated unit weight",   units:["lb/ft3","kN/m3"], toBase:[1, 6.366] },
            "gw":   { sym:"γ_w",   desc:"Unit weight of water",    units:["lb/ft3","kN/m3"], toBase:[1, 6.366] }
          },
          solvers:{
            "gp":   v=>({ val:v.gsat-v.gw,   rearr:"γ' = γ_sat − γ_w",   sub:"γ_sat="+fN(v.gsat)+", γ_w="+fN(v.gw) }),
            "gsat": v=>({ val:v.gp+v.gw,     rearr:"γ_sat = γ' + γ_w",   sub:"γ'="+fN(v.gp)+", γ_w="+fN(v.gw) }),
            "gw":   v=>({ val:v.gsat-v.gp,   rearr:"γ_w = γ_sat − γ'",   sub:"γ_sat="+fN(v.gsat)+", γ'="+fN(v.gp) })
          }
        },

        // ── Water Content ────────────────────────────────────────
        {
          id:"water_content", name:"Water Content",
          formula:"omega = (Ww / Ws) × 100",
          desc:"Mass of water expressed as a percentage of mass of solids. (CE371 Ref p.1)",
          ref:"CE371 Ref p.1",
          vars:{
            "omega":{ sym:"ω",  desc:"Water content",      units:["%"],  toBase:[1] },
            "Ww":   { sym:"Ww", desc:"Weight of water",    units:["lb","kN"], toBase:[1, 224.809] },
            "Ws":   { sym:"Ws", desc:"Weight of solids",   units:["lb","kN"], toBase:[1, 224.809] }
          },
          solvers:{
            "omega": v=>({ val:(v.Ww/v.Ws)*100,       rearr:"ω = (Ww/Ws) × 100",    sub:"Ww="+fN(v.Ww)+", Ws="+fN(v.Ws) }),
            "Ww":    v=>({ val:v.omega/100*v.Ws,       rearr:"Ww = (ω/100) × Ws",    sub:"ω="+fN(v.omega)+"%, Ws="+fN(v.Ws) }),
            "Ws":    v=>({ val:v.Ww/(v.omega/100),     rearr:"Ws = Ww / (ω/100)",    sub:"Ww="+fN(v.Ww)+", ω="+fN(v.omega)+"%" })
          }
        },

        // ── Specific Gravity ─────────────────────────────────────
        {
          id:"spec_grav", name:"Specific Gravity of Soil Solids",
          formula:"Gs = (Ws/Vs) / gamma_w",
          desc:"Ratio of unit weight of solids to unit weight of water. (CE371 Ref p.1)",
          ref:"CE371 Ref p.1",
          vars:{
            "Gs":   { sym:"Gs",   desc:"Specific gravity of solids",   units:["dimensionless"], toBase:[1] },
            "gs":   { sym:"γ_s",  desc:"Unit weight of solids (Ws/Vs)", units:["lb/ft3","kN/m3"], toBase:[1, 6.366] },
            "gw":   { sym:"γ_w",  desc:"Unit weight of water",          units:["lb/ft3","kN/m3"], toBase:[1, 6.366] }
          },
          solvers:{
            "Gs":  v=>({ val:v.gs/v.gw,   rearr:"Gs = γ_s / γ_w",   sub:"γ_s="+fN(v.gs)+", γ_w="+fN(v.gw) }),
            "gs":  v=>({ val:v.Gs*v.gw,   rearr:"γ_s = Gs × γ_w",   sub:"Gs="+fN(v.Gs)+", γ_w="+fN(v.gw) }),
            "gw":  v=>({ val:v.gs/v.Gs,   rearr:"γ_w = γ_s / Gs",   sub:"γ_s="+fN(v.gs)+", Gs="+fN(v.Gs) })
          }
        },

        // ── Void Ratio ───────────────────────────────────────────
        {
          id:"void_ratio", name:"Void Ratio",
          formula:"e = Vv / Vs",
          desc:"Ratio of volume of voids to volume of solids. (CE371 Ref p.1)",
          ref:"CE371 Ref p.1",
          vars:{
            "e":  { sym:"e",  desc:"Void ratio",          units:["dimensionless"], toBase:[1] },
            "Vv": { sym:"Vv", desc:"Volume of voids",     units:["ft3","m3","cm3"], toBase:[1, 35.3147, 35314.7] },
            "Vs": { sym:"Vs", desc:"Volume of solids",    units:["ft3","m3","cm3"], toBase:[1, 35.3147, 35314.7] }
          },
          solvers:{
            "e":  v=>({ val:v.Vv/v.Vs,   rearr:"e = Vv / Vs",   sub:"Vv="+fN(v.Vv)+", Vs="+fN(v.Vs) }),
            "Vv": v=>({ val:v.e*v.Vs,    rearr:"Vv = e × Vs",   sub:"e="+fN(v.e)+", Vs="+fN(v.Vs) }),
            "Vs": v=>({ val:v.Vv/v.e,    rearr:"Vs = Vv / e",   sub:"Vv="+fN(v.Vv)+", e="+fN(v.e) })
          }
        },

        // ── Porosity ─────────────────────────────────────────────
        {
          id:"porosity", name:"Porosity",
          formula:"n = Vv / V = e / (1 + e)",
          desc:"Ratio of void volume to total volume. Related to void ratio by n = e/(1+e). (CE371 Ref p.1)",
          ref:"CE371 Ref p.1",
          vars:{
            "n": { sym:"n", desc:"Porosity (decimal)",  units:["dimensionless"], toBase:[1] },
            "e": { sym:"e", desc:"Void ratio",           units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "n": v=>({ val:v.e/(1+v.e),   rearr:"n = e / (1 + e)",   sub:"e="+fN(v.e) }),
            "e": v=>({ val:v.n/(1-v.n),   rearr:"e = n / (1 − n)",   sub:"n="+fN(v.n) })
          }
        },

        // ── Degree of Saturation ─────────────────────────────────
        {
          id:"saturation", name:"Degree of Saturation",
          formula:"S = (Vw / Vv) × 100  =  (omega × Gs / e) × 100",
          desc:"Percentage of void space filled with water. Also S = ω×Gs/e. (CE371 Ref p.2)",
          ref:"CE371 Ref p.2",
          vars:{
            "S":     { sym:"S",   desc:"Degree of saturation",     units:["%"],              toBase:[1] },
            "omega": { sym:"ω",   desc:"Water content (decimal)",   units:["dimensionless"],  toBase:[1] },
            "Gs":    { sym:"Gs",  desc:"Specific gravity of solids", units:["dimensionless"], toBase:[1] },
            "e":     { sym:"e",   desc:"Void ratio",                units:["dimensionless"],  toBase:[1] }
          },
          solvers:{
            "S":     v=>({ val:v.omega*v.Gs/v.e*100,   rearr:"S = (ω × Gs / e) × 100",   sub:"ω="+fN(v.omega)+", Gs="+fN(v.Gs)+", e="+fN(v.e) }),
            "omega": v=>({ val:v.S/100*v.e/v.Gs,       rearr:"ω = (S/100) × e / Gs",      sub:"S="+fN(v.S)+"%, e="+fN(v.e)+", Gs="+fN(v.Gs) }),
            "e":     v=>({ val:v.omega*v.Gs/(v.S/100), rearr:"e = ω × Gs / (S/100)",      sub:"ω="+fN(v.omega)+", Gs="+fN(v.Gs)+", S="+fN(v.S)+"%" }),
            "Gs":    v=>({ val:v.S/100*v.e/v.omega,    rearr:"Gs = (S/100) × e / ω",      sub:"S="+fN(v.S)+"%, e="+fN(v.e)+", ω="+fN(v.omega) })
          }
        },

        // ── Relative Density ─────────────────────────────────────
        {
          id:"rel_density", name:"Relative Density",
          formula:"Dr = [(emax - e) / (emax - emin)] × 100",
          desc:"Measure of compactness of granular soil relative to loosest and densest states. (CE371 Ref p.2)",
          ref:"CE371 Ref p.2",
          vars:{
            "Dr":   { sym:"Dr",   desc:"Relative density",  units:["%"],              toBase:[1] },
            "emax": { sym:"emax", desc:"Maximum void ratio (loosest state)", units:["dimensionless"], toBase:[1] },
            "emin": { sym:"emin", desc:"Minimum void ratio (densest state)", units:["dimensionless"], toBase:[1] },
            "e":    { sym:"e",    desc:"In-situ void ratio", units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "Dr":   v=>({ val:(v.emax-v.e)/(v.emax-v.emin)*100,         rearr:"Dr = (emax−e)/(emax−emin) × 100",     sub:"emax="+fN(v.emax)+", e="+fN(v.e)+", emin="+fN(v.emin) }),
            "e":    v=>({ val:v.emax - (v.Dr/100)*(v.emax-v.emin),      rearr:"e = emax − (Dr/100)×(emax−emin)",     sub:"Dr="+fN(v.Dr)+"%, emax="+fN(v.emax)+", emin="+fN(v.emin) }),
            "emax": v=>({ val:(v.e*(v.Dr/100)-v.emin*(v.Dr/100-1))/(v.Dr/100-0+1-v.Dr/100), // derived
              // emax = e + (Dr/100)*(emax-emin) → emax(1 - Dr/100) = e - (Dr/100)*emin → emax = (e - (Dr/100)*emin)/(1-Dr/100)
              val:(v.e - (v.Dr/100)*v.emin)/(1 - v.Dr/100),
              rearr:"emax = (e − (Dr/100)×emin) / (1 − Dr/100)",        sub:"e="+fN(v.e)+", Dr="+fN(v.Dr)+"%, emin="+fN(v.emin) }),
            "emin": v=>({ val:v.emax - (v.emax-v.e)/(v.Dr/100),         rearr:"emin = emax − (emax−e)/(Dr/100)",     sub:"emax="+fN(v.emax)+", e="+fN(v.e)+", Dr="+fN(v.Dr)+"%" })
          }
        },

        // ── Relative Compaction ──────────────────────────────────
        {
          id:"rel_compact", name:"Relative Compaction",
          formula:"RC = (gamma_d_field / gamma_d_max) × 100",
          desc:"Field dry unit weight as a percentage of laboratory maximum dry unit weight. (CE371 Ref p.2)",
          ref:"CE371 Ref p.2",
          vars:{
            "RC":    { sym:"RC",       desc:"Relative compaction",       units:["%"],              toBase:[1] },
            "gdfield":{ sym:"γd_field", desc:"Field dry unit weight",    units:["lb/ft3","kN/m3"], toBase:[1, 6.366] },
            "gdmax": { sym:"γd_max",   desc:"Max dry unit weight (Proctor)", units:["lb/ft3","kN/m3"], toBase:[1, 6.366] }
          },
          solvers:{
            "RC":      v=>({ val:v.gdfield/v.gdmax*100,     rearr:"RC = (γd_field/γd_max) × 100",   sub:"γd_field="+fN(v.gdfield)+", γd_max="+fN(v.gdmax) }),
            "gdfield": v=>({ val:v.RC/100*v.gdmax,          rearr:"γd_field = (RC/100) × γd_max",   sub:"RC="+fN(v.RC)+"%, γd_max="+fN(v.gdmax) }),
            "gdmax":   v=>({ val:v.gdfield/(v.RC/100),      rearr:"γd_max = γd_field / (RC/100)",   sub:"γd_field="+fN(v.gdfield)+", RC="+fN(v.RC)+"%" })
          }
        },

        // ── Plasticity Index ─────────────────────────────────────
        {
          id:"PI", name:"Plasticity Index",
          formula:"PI = LL - PL",
          desc:"Range of water content over which soil behaves plastically. (CE371 Ref p.2)",
          ref:"CE371 Ref p.2",
          vars:{
            "PI": { sym:"PI", desc:"Plasticity index",  units:["%"], toBase:[1] },
            "LL": { sym:"LL", desc:"Liquid limit",       units:["%"], toBase:[1] },
            "PL": { sym:"PL", desc:"Plastic limit",      units:["%"], toBase:[1] }
          },
          solvers:{
            "PI": v=>({ val:v.LL-v.PL,   rearr:"PI = LL − PL",   sub:"LL="+fN(v.LL)+"%, PL="+fN(v.PL)+"%" }),
            "LL": v=>({ val:v.PI+v.PL,   rearr:"LL = PI + PL",   sub:"PI="+fN(v.PI)+"%, PL="+fN(v.PL)+"%" }),
            "PL": v=>({ val:v.LL-v.PI,   rearr:"PL = LL − PI",   sub:"LL="+fN(v.LL)+"%, PI="+fN(v.PI)+"%" })
          }
        },

        // ── Coefficient of Uniformity ────────────────────────────
        {
          id:"Cu", name:"Coefficient of Uniformity",
          formula:"Cu = D60 / D10",
          desc:"Measure of grain size range. Cu ≥ 4 for well-graded gravel; ≥ 6 for well-graded sand. (CE371 Ref p.2)",
          ref:"CE371 Ref p.2",
          vars:{
            "Cu":  { sym:"Cu",  desc:"Coefficient of uniformity", units:["dimensionless"], toBase:[1] },
            "D60": { sym:"D60", desc:"Grain diameter at 60% passing", units:["mm"],        toBase:[1] },
            "D10": { sym:"D10", desc:"Grain diameter at 10% passing", units:["mm"],        toBase:[1] }
          },
          solvers:{
            "Cu":  v=>({ val:v.D60/v.D10,   rearr:"Cu = D60 / D10",   sub:"D60="+fN(v.D60)+"mm, D10="+fN(v.D10)+"mm" }),
            "D60": v=>({ val:v.Cu*v.D10,    rearr:"D60 = Cu × D10",   sub:"Cu="+fN(v.Cu)+", D10="+fN(v.D10)+"mm" }),
            "D10": v=>({ val:v.D60/v.Cu,    rearr:"D10 = D60 / Cu",   sub:"D60="+fN(v.D60)+"mm, Cu="+fN(v.Cu) })
          }
        },

        // ── Coefficient of Concavity ─────────────────────────────
        {
          id:"Cc", name:"Coefficient of Concavity (Curvature)",
          formula:"Cc = (D30)^2 / (D10 x D60)",
          desc:"Measures shape of grain size curve. 1 ≤ Cc ≤ 3 for well-graded soil. (CE371 Ref p.2)",
          ref:"CE371 Ref p.2",
          vars:{
            "Cc":  { sym:"Cc",  desc:"Coefficient of concavity",       units:["dimensionless"], toBase:[1] },
            "D30": { sym:"D30", desc:"Grain diameter at 30% passing",  units:["mm"],             toBase:[1] },
            "D10": { sym:"D10", desc:"Grain diameter at 10% passing",  units:["mm"],             toBase:[1] },
            "D60": { sym:"D60", desc:"Grain diameter at 60% passing",  units:["mm"],             toBase:[1] }
          },
          solvers:{
            "Cc":  v=>({ val:v.D30*v.D30/(v.D10*v.D60),             rearr:"Cc = D30² / (D10×D60)",   sub:"D30="+fN(v.D30)+", D10="+fN(v.D10)+", D60="+fN(v.D60) }),
            "D30": v=>({ val:Math.sqrt(v.Cc*v.D10*v.D60),           rearr:"D30 = sqrt(Cc×D10×D60)",  sub:"Cc="+fN(v.Cc)+", D10="+fN(v.D10)+", D60="+fN(v.D60) }),
            "D10": v=>({ val:v.D30*v.D30/(v.Cc*v.D60),             rearr:"D10 = D30² / (Cc×D60)",   sub:"D30="+fN(v.D30)+", Cc="+fN(v.Cc)+", D60="+fN(v.D60) }),
            "D60": v=>({ val:v.D30*v.D30/(v.Cc*v.D10),             rearr:"D60 = D30² / (Cc×D10)",   sub:"D30="+fN(v.D30)+", Cc="+fN(v.Cc)+", D10="+fN(v.D10) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 2 — STRESS & SEEPAGE
    // Effective stress, shear stress, Mohr-Coulomb, seepage FS
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "stress",
      title: "Stress & Seepage",
      desc:  "Effective stress, pore pressure, Mohr-Coulomb failure criterion, seepage liquefaction",
      equations: [

        // ── Total Normal Stress ──────────────────────────────────
        {
          id:"sigma_total", name:"Total Normal Stress",
          formula:"sigma_N = P / A",
          desc:"Normal stress from applied force over area. (CE371 Ref p.5)",
          ref:"CE371 Ref p.5",
          vars:{
            "sN": { sym:"σ_N", desc:"Total normal stress",  units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "P":  { sym:"P",   desc:"Normal force",          units:["lb","kip","kN"],   toBase:[1, 1000, 224.809] },
            "A":  { sym:"A",   desc:"Cross-sectional area",  units:["ft2","in2","m2"],  toBase:[1, 0.00694, 10.7639] }
          },
          solvers:{
            "sN": v=>({ val:v.P/v.A,     rearr:"σ_N = P / A",     sub:"P="+fN(v.P)+", A="+fN(v.A) }),
            "P":  v=>({ val:v.sN*v.A,    rearr:"P = σ_N × A",     sub:"σ_N="+fN(v.sN)+", A="+fN(v.A) }),
            "A":  v=>({ val:v.P/v.sN,    rearr:"A = P / σ_N",     sub:"P="+fN(v.P)+", σ_N="+fN(v.sN) })
          }
        },

        // ── Effective Stress ─────────────────────────────────────
        {
          id:"eff_stress", name:"Effective Stress",
          formula:"sigma' = sigma - u",
          desc:"Stress carried by soil skeleton. u = hu × γw where hu = pressure head. (CE371 Ref p.5)",
          ref:"CE371 Ref p.5",
          vars:{
            "sp": { sym:"σ'",  desc:"Effective stress",  units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "s":  { sym:"σ",   desc:"Total stress",       units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "u":  { sym:"u",   desc:"Pore water pressure", units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] }
          },
          solvers:{
            "sp": v=>({ val:v.s-v.u,    rearr:"σ' = σ − u",    sub:"σ="+fN(v.s)+", u="+fN(v.u) }),
            "s":  v=>({ val:v.sp+v.u,   rearr:"σ = σ' + u",    sub:"σ'="+fN(v.sp)+", u="+fN(v.u) }),
            "u":  v=>({ val:v.s-v.sp,   rearr:"u = σ − σ'",    sub:"σ="+fN(v.s)+", σ'="+fN(v.sp) })
          }
        },

        // ── Pore Water Pressure from Head ────────────────────────
        {
          id:"pore_pressure", name:"Pore Water Pressure from Pressure Head",
          formula:"u = hu x gamma_w",
          desc:"Pore water pressure from uplift or pressure head. (CE371 Ref p.5)",
          ref:"CE371 Ref p.5",
          vars:{
            "u":  { sym:"u",   desc:"Pore water pressure",  units:["psf","kPa"],      toBase:[1, 20.8854] },
            "hu": { sym:"hu",  desc:"Uplift/pressure head",  units:["ft","m"],          toBase:[1, 3.28084] },
            "gw": { sym:"γ_w", desc:"Unit weight of water",  units:["lb/ft3","kN/m3"], toBase:[1, 6.366] }
          },
          solvers:{
            "u":  v=>({ val:v.hu*v.gw,   rearr:"u = hu × γ_w",   sub:"hu="+fN(v.hu)+", γ_w="+fN(v.gw) }),
            "hu": v=>({ val:v.u/v.gw,    rearr:"hu = u / γ_w",   sub:"u="+fN(v.u)+", γ_w="+fN(v.gw) }),
            "gw": v=>({ val:v.u/v.hu,    rearr:"γ_w = u / hu",   sub:"u="+fN(v.u)+", hu="+fN(v.hu) })
          }
        },

        // ── Shear Stress ─────────────────────────────────────────
        {
          id:"shear_stress", name:"Shear Stress",
          formula:"tau = T / A",
          desc:"Shear stress from applied shearing force over area. (CE371 Ref p.5)",
          ref:"CE371 Ref p.5",
          vars:{
            "tau": { sym:"τ",  desc:"Shear stress",          units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "T":   { sym:"T",  desc:"Shearing force",         units:["lb","kip","kN"],   toBase:[1, 1000, 224.809] },
            "A":   { sym:"A",  desc:"Cross-sectional area",   units:["ft2","in2","m2"],  toBase:[1, 0.00694, 10.7639] }
          },
          solvers:{
            "tau": v=>({ val:v.T/v.A,    rearr:"τ = T / A",    sub:"T="+fN(v.T)+", A="+fN(v.A) }),
            "T":   v=>({ val:v.tau*v.A,  rearr:"T = τ × A",    sub:"τ="+fN(v.tau)+", A="+fN(v.A) }),
            "A":   v=>({ val:v.T/v.tau,  rearr:"A = T / τ",    sub:"T="+fN(v.T)+", τ="+fN(v.tau) })
          }
        },

        // ── Mohr-Coulomb Failure Criterion ───────────────────────
        {
          id:"mohr_coulomb", name:"Mohr-Coulomb Shear Strength",
          formula:"tau_F = c + sigma_N x tan(phi)",
          desc:"Shear stress at failure on the failure plane. c = cohesion, φ = friction angle. (CE371 Ref p.4)",
          ref:"CE371 Ref p.4",
          vars:{
            "tauF": { sym:"τ_F",   desc:"Shear stress at failure",    units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "c":    { sym:"c",     desc:"Cohesion",                    units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "sN":   { sym:"σ_N",   desc:"Normal stress on failure plane", units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "phi":  { sym:"φ",     desc:"Angle of internal friction",  units:["deg"],              toBase:[1] }
          },
          solvers:{
            "tauF": v=>({ val:v.c + v.sN*Math.tan(v.phi*Math.PI/180),                    rearr:"τ_F = c + σ_N × tan(φ)",         sub:"c="+fN(v.c)+", σ_N="+fN(v.sN)+", φ="+fN(v.phi)+"°" }),
            "c":    v=>({ val:v.tauF - v.sN*Math.tan(v.phi*Math.PI/180),                  rearr:"c = τ_F − σ_N × tan(φ)",         sub:"τ_F="+fN(v.tauF)+", σ_N="+fN(v.sN)+", φ="+fN(v.phi)+"°" }),
            "sN":   v=>({ val:(v.tauF - v.c)/Math.tan(v.phi*Math.PI/180),                 rearr:"σ_N = (τ_F − c) / tan(φ)",       sub:"τ_F="+fN(v.tauF)+", c="+fN(v.c)+", φ="+fN(v.phi)+"°" }),
            "phi":  v=>({ val:Math.atan((v.tauF - v.c)/v.sN)*180/Math.PI,                 rearr:"φ = arctan((τ_F − c) / σ_N)",    sub:"τ_F="+fN(v.tauF)+", c="+fN(v.c)+", σ_N="+fN(v.sN) })
          }
        },

        // ── Seepage Liquefaction FS ──────────────────────────────
        {
          id:"seepage_fs", name:"Factor of Safety Against Seepage Liquefaction",
          formula:"FSs = ic / ie",
          desc:"ic = critical gradient = (γ_sat − γ_w)/γ_w. ie = seepage exit gradient. (CE371 Ref p.2)",
          ref:"CE371 Ref p.2",
          vars:{
            "FSs": { sym:"FSs", desc:"Factor of safety (liquefaction)", units:["dimensionless"], toBase:[1] },
            "ic":  { sym:"ic",  desc:"Critical hydraulic gradient",      units:["dimensionless"], toBase:[1] },
            "ie":  { sym:"ie",  desc:"Seepage exit gradient",            units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "FSs": v=>({ val:v.ic/v.ie,    rearr:"FSs = ic / ie",    sub:"ic="+fN(v.ic)+", ie="+fN(v.ie) }),
            "ic":  v=>({ val:v.FSs*v.ie,   rearr:"ic = FSs × ie",    sub:"FSs="+fN(v.FSs)+", ie="+fN(v.ie) }),
            "ie":  v=>({ val:v.ic/v.FSs,   rearr:"ie = ic / FSs",    sub:"ic="+fN(v.ic)+", FSs="+fN(v.FSs) })
          }
        },

        // ── Critical Hydraulic Gradient ──────────────────────────
        {
          id:"crit_gradient", name:"Critical Hydraulic Gradient",
          formula:"ic = (gamma_sat - gamma_w) / gamma_w",
          desc:"Upward gradient at which effective stress becomes zero (quicksand/liquefaction). (CE371 Ref p.2)",
          ref:"CE371 Ref p.2",
          vars:{
            "ic":   { sym:"ic",    desc:"Critical hydraulic gradient", units:["dimensionless"], toBase:[1] },
            "gsat": { sym:"γ_sat", desc:"Saturated unit weight",       units:["lb/ft3","kN/m3"], toBase:[1, 6.366] },
            "gw":   { sym:"γ_w",   desc:"Unit weight of water",        units:["lb/ft3","kN/m3"], toBase:[1, 6.366] }
          },
          solvers:{
            "ic":   v=>({ val:(v.gsat-v.gw)/v.gw,   rearr:"ic = (γ_sat − γ_w) / γ_w",   sub:"γ_sat="+fN(v.gsat)+", γ_w="+fN(v.gw) }),
            "gsat": v=>({ val:v.ic*v.gw + v.gw,     rearr:"γ_sat = ic×γ_w + γ_w",        sub:"ic="+fN(v.ic)+", γ_w="+fN(v.gw) }),
            "gw":   v=>({ val:v.gsat/(1+v.ic),       rearr:"γ_w = γ_sat / (1 + ic)",      sub:"γ_sat="+fN(v.gsat)+", ic="+fN(v.ic) })
          }
        },

        // ── Boussinesq Point Load ────────────────────────────────
        {
          id:"boussinesq_pt", name:"Boussinesq Vertical Stress — Point Load",
          formula:"sigma_z = (3P/2pi) × z^3 / (r^2 + z^2)^(5/2) = Cr × P/z^2",
          desc:"Vertical stress at depth z below a surface point load P at radial distance r. Use Cr table for r/z ratio. (CE371 Ref p.8)",
          ref:"CE371 Ref p.8",
          vars:{
            "sz": { sym:"σ_z", desc:"Vertical stress at depth z",   units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "Cr": { sym:"Cr",  desc:"Boussinesq influence factor (from r/z table)", units:["dimensionless"], toBase:[1] },
            "P":  { sym:"P",   desc:"Point load",                    units:["lb","kip","kN"],   toBase:[1, 1000, 224.809] },
            "z":  { sym:"z",   desc:"Depth below surface",           units:["ft","m"],           toBase:[1, 3.28084] }
          },
          solvers:{
            "sz": v=>({ val:v.Cr*v.P/(v.z*v.z),   rearr:"σ_z = Cr × P / z²",   sub:"Cr="+fN(v.Cr)+", P="+fN(v.P)+", z="+fN(v.z) }),
            "P":  v=>({ val:v.sz*v.z*v.z/v.Cr,    rearr:"P = σ_z × z² / Cr",   sub:"σ_z="+fN(v.sz)+", z="+fN(v.z)+", Cr="+fN(v.Cr) }),
            "Cr": v=>({ val:v.sz*v.z*v.z/v.P,     rearr:"Cr = σ_z × z² / P",   sub:"σ_z="+fN(v.sz)+", z="+fN(v.z)+", P="+fN(v.P) }),
            "z":  v=>({ val:Math.sqrt(v.Cr*v.P/v.sz), rearr:"z = sqrt(Cr×P/σ_z)", sub:"Cr="+fN(v.Cr)+", P="+fN(v.P)+", σ_z="+fN(v.sz) })
          }
        },

        // ── Consolidation Time Factor ────────────────────────────
        {
          id:"time_factor", name:"Consolidation Time Factor",
          formula:"Tv = cv x t / Hdr^2",
          desc:"Dimensionless time factor for consolidation. Hdr = drainage path (H/2 for two-way, H for one-way). (CE371 Ref p.4)",
          ref:"CE371 Ref p.4",
          vars:{
            "Tv":  { sym:"Tv",  desc:"Time factor (dimensionless)", units:["dimensionless"], toBase:[1] },
            "cv":  { sym:"cv",  desc:"Coefficient of consolidation", units:["ft2/yr","cm2/s","m2/yr"], toBase:[1, 3.34451e6, 10.7639] },
            "t":   { sym:"t",   desc:"Elapsed time",                 units:["yr","d","s"],              toBase:[1, 1/365, 3.171e-8] },
            "Hdr": { sym:"Hdr", desc:"Drainage path length",         units:["ft","m"],                  toBase:[1, 3.28084] }
          },
          solvers:{
            "Tv":  v=>({ val:v.cv*v.t/(v.Hdr*v.Hdr),    rearr:"Tv = cv × t / Hdr²",    sub:"cv="+fN(v.cv)+", t="+fN(v.t)+", Hdr="+fN(v.Hdr) }),
            "t":   v=>({ val:v.Tv*v.Hdr*v.Hdr/v.cv,     rearr:"t = Tv × Hdr² / cv",    sub:"Tv="+fN(v.Tv)+", Hdr="+fN(v.Hdr)+", cv="+fN(v.cv) }),
            "cv":  v=>({ val:v.Tv*v.Hdr*v.Hdr/v.t,      rearr:"cv = Tv × Hdr² / t",    sub:"Tv="+fN(v.Tv)+", Hdr="+fN(v.Hdr)+", t="+fN(v.t) }),
            "Hdr": v=>({ val:Math.sqrt(v.cv*v.t/v.Tv),  rearr:"Hdr = sqrt(cv×t/Tv)",   sub:"cv="+fN(v.cv)+", t="+fN(v.t)+", Tv="+fN(v.Tv) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 3 — CONSOLIDATION & SETTLEMENT
    // Compression index, settlement equations, degree of consolidation
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "consolidation",
      title: "Consolidation & Settlement",
      desc:  "Cc, Cr, compression index, settlement calculations, approximate settlement",
      equations: [

        // ── Compression Index (Cc) ───────────────────────────────
        {
          id:"Cc_def", name:"Compression Index (from e-log p curve)",
          formula:"Cc = delta_e / delta_log_p",
          desc:"Slope of virgin compression line in e vs log(p) space. (CE371 Ref p.3)",
          ref:"CE371 Ref p.3",
          vars:{
            "Cc":    { sym:"Cc",       desc:"Compression index",    units:["dimensionless"], toBase:[1] },
            "de":    { sym:"Δe",       desc:"Change in void ratio",  units:["dimensionless"], toBase:[1] },
            "dlogp": { sym:"Δlog(p)",  desc:"Change in log(pressure)", units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "Cc":    v=>({ val:v.de/v.dlogp,   rearr:"Cc = Δe / Δlog(p)",   sub:"Δe="+fN(v.de)+", Δlog(p)="+fN(v.dlogp) }),
            "de":    v=>({ val:v.Cc*v.dlogp,   rearr:"Δe = Cc × Δlog(p)",   sub:"Cc="+fN(v.Cc)+", Δlog(p)="+fN(v.dlogp) }),
            "dlogp": v=>({ val:v.de/v.Cc,      rearr:"Δlog(p) = Δe / Cc",   sub:"Δe="+fN(v.de)+", Cc="+fN(v.Cc) })
          }
        },

        // ── Cc from Liquid Limit ─────────────────────────────────
        {
          id:"Cc_LL", name:"Compression Index from Liquid Limit",
          formula:"Cc = 0.009 x (LL - 10)",
          desc:"Empirical correlation for compression index from liquid limit (Terzaghi & Peck). (CE371 Ref p.3)",
          ref:"CE371 Ref p.3",
          vars:{
            "Cc": { sym:"Cc", desc:"Compression index",  units:["dimensionless"], toBase:[1] },
            "LL": { sym:"LL", desc:"Liquid limit",        units:["%"],             toBase:[1] }
          },
          solvers:{
            "Cc": v=>({ val:0.009*(v.LL-10),   rearr:"Cc = 0.009 × (LL − 10)",   sub:"LL="+fN(v.LL)+"%" }),
            "LL": v=>({ val:v.Cc/0.009+10,     rearr:"LL = Cc/0.009 + 10",        sub:"Cc="+fN(v.Cc) })
          }
        },

        // ── Recompression Index (Cr) ─────────────────────────────
        {
          id:"Cr_def", name:"Recompression Index",
          formula:"Cr = Cc / 6",
          desc:"Slope of recompression line. Approximately Cc/6 by correlation. (CE371 Ref p.3)",
          ref:"CE371 Ref p.3",
          vars:{
            "Cr": { sym:"Cr", desc:"Recompression index",  units:["dimensionless"], toBase:[1] },
            "Cc": { sym:"Cc", desc:"Compression index",    units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "Cr": v=>({ val:v.Cc/6,    rearr:"Cr = Cc / 6",   sub:"Cc="+fN(v.Cc) }),
            "Cc": v=>({ val:v.Cr*6,    rearr:"Cc = Cr × 6",   sub:"Cr="+fN(v.Cr) })
          }
        },

        // ── Settlement — Recompression Only (Case 1) ─────────────
        {
          id:"settle_rc", name:"Settlement — Recompression Only (p0 ≥ pc, p0+Δp ≥ pc)",
          formula:"dH = H0/(1+e0) × Cc × log10((p0+dp)/p0)",
          desc:"Virgin compression only when initial stress ≥ preconsolidation stress. (CE371 Ref p.3)",
          ref:"CE371 Ref p.3",
          vars:{
            "dH": { sym:"ΔH",   desc:"Change in layer thickness (settlement)", units:["ft","m","in"], toBase:[1, 3.28084, 0.08333] },
            "H0": { sym:"H0",   desc:"Initial layer thickness",                 units:["ft","m"],       toBase:[1, 3.28084] },
            "e0": { sym:"e0",   desc:"Initial void ratio",                      units:["dimensionless"], toBase:[1] },
            "Cc": { sym:"Cc",   desc:"Compression index",                       units:["dimensionless"], toBase:[1] },
            "p0": { sym:"p0",   desc:"Initial effective consolidation stress",  units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "dp": { sym:"Δp",   desc:"Change in consolidation stress",          units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] }
          },
          solvers:{
            "dH": v=>({ val:v.H0/(1+v.e0)*v.Cc*Math.log10((v.p0+v.dp)/v.p0),   rearr:"ΔH = H0/(1+e0) × Cc × log10((p0+Δp)/p0)",   sub:"H0="+fN(v.H0)+", e0="+fN(v.e0)+", Cc="+fN(v.Cc)+", p0="+fN(v.p0)+", Δp="+fN(v.dp) }),
            "H0": v=>({ val:v.dH*(1+v.e0)/(v.Cc*Math.log10((v.p0+v.dp)/v.p0)), rearr:"H0 = ΔH×(1+e0) / [Cc×log10((p0+Δp)/p0)]",  sub:"ΔH="+fN(v.dH)+", e0="+fN(v.e0)+", Cc="+fN(v.Cc)+", p0="+fN(v.p0)+", Δp="+fN(v.dp) }),
            "Cc": v=>({ val:v.dH*(1+v.e0)/(v.H0*Math.log10((v.p0+v.dp)/v.p0)), rearr:"Cc = ΔH×(1+e0) / [H0×log10((p0+Δp)/p0)]",  sub:"ΔH="+fN(v.dH)+", H0="+fN(v.H0)+", e0="+fN(v.e0)+", p0="+fN(v.p0)+", Δp="+fN(v.dp) }),
            "dp": v=>({ val:v.p0*(Math.pow(10, v.dH*(1+v.e0)/(v.H0*v.Cc))-1),  rearr:"Δp = p0×[10^(ΔH×(1+e0)/(H0×Cc)) − 1]",    sub:"ΔH="+fN(v.dH)+", H0="+fN(v.H0)+", e0="+fN(v.e0)+", Cc="+fN(v.Cc)+", p0="+fN(v.p0) })
          }
        },

        // ── Settlement — Both RC and Virgin (Case 3) ─────────────
        {
          id:"settle_both", name:"Settlement — Recompression + Virgin Compression (p0 < pc < p0+Δp)",
          formula:"dH = H0/(1+e0) × [Cr×log10(pc/p0) + Cc×log10((p0+dp)/pc)]",
          desc:"Mixed settlement when stress crosses preconsolidation pressure. (CE371 Ref p.3)",
          ref:"CE371 Ref p.3",
          vars:{
            "dH": { sym:"ΔH",  desc:"Total settlement",                          units:["ft","m","in"], toBase:[1, 3.28084, 0.08333] },
            "H0": { sym:"H0",  desc:"Initial layer thickness",                    units:["ft","m"],       toBase:[1, 3.28084] },
            "e0": { sym:"e0",  desc:"Initial void ratio",                         units:["dimensionless"], toBase:[1] },
            "Cr": { sym:"Cr",  desc:"Recompression index",                        units:["dimensionless"], toBase:[1] },
            "Cc": { sym:"Cc",  desc:"Compression index",                          units:["dimensionless"], toBase:[1] },
            "p0": { sym:"p0",  desc:"Initial effective stress",                   units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "pc": { sym:"pc",  desc:"Preconsolidation stress",                    units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "dp": { sym:"Δp",  desc:"Applied stress increase",                    units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] }
          },
          solvers:{
            "dH": v=>({ val:v.H0/(1+v.e0)*(v.Cr*Math.log10(v.pc/v.p0) + v.Cc*Math.log10((v.p0+v.dp)/v.pc)),
              rearr:"ΔH = H0/(1+e0)×[Cr×log(pc/p0) + Cc×log((p0+Δp)/pc)]",
              sub:"H0="+fN(v.H0)+", e0="+fN(v.e0)+", Cr="+fN(v.Cr)+", Cc="+fN(v.Cc)+", p0="+fN(v.p0)+", pc="+fN(v.pc)+", Δp="+fN(v.dp) }),
            "H0": v=>({ val:v.dH*(1+v.e0)/(v.Cr*Math.log10(v.pc/v.p0) + v.Cc*Math.log10((v.p0+v.dp)/v.pc)),
              rearr:"H0 = ΔH×(1+e0) / [Cr×log(pc/p0) + Cc×log((p0+Δp)/pc)]",
              sub:"ΔH="+fN(v.dH)+", e0="+fN(v.e0)+", Cr="+fN(v.Cr)+", Cc="+fN(v.Cc)+", p0="+fN(v.p0)+", pc="+fN(v.pc)+", Δp="+fN(v.dp) })
          }
        },

        // ── Ultimate Consolidation Settlement ────────────────────
        {
          id:"sult", name:"Ultimate Consolidation Settlement",
          formula:"Sult = epsilon_v x Hs",
          desc:"εv = ΔeTOT / (1 + e0). Total settlement when full consolidation is reached. (CE371 Ref p.3)",
          ref:"CE371 Ref p.3",
          vars:{
            "Sult": { sym:"Sult", desc:"Ultimate consolidation settlement", units:["ft","m","in"], toBase:[1, 3.28084, 0.08333] },
            "ev":   { sym:"εv",   desc:"Volumetric strain = ΔeTOT/(1+e0)", units:["dimensionless"], toBase:[1] },
            "Hs":   { sym:"Hs",   desc:"Thickness of soil layer",           units:["ft","m"],        toBase:[1, 3.28084] }
          },
          solvers:{
            "Sult": v=>({ val:v.ev*v.Hs,    rearr:"Sult = εv × Hs",    sub:"εv="+fN(v.ev)+", Hs="+fN(v.Hs) }),
            "ev":   v=>({ val:v.Sult/v.Hs,  rearr:"εv = Sult / Hs",    sub:"Sult="+fN(v.Sult)+", Hs="+fN(v.Hs) }),
            "Hs":   v=>({ val:v.Sult/v.ev,  rearr:"Hs = Sult / εv",    sub:"Sult="+fN(v.Sult)+", εv="+fN(v.ev) })
          }
        },

        // ── Volumetric Strain ────────────────────────────────────
        {
          id:"eps_v", name:"Volumetric Strain",
          formula:"epsilon_v = delta_e_TOT / (1 + e0)",
          desc:"Vertical strain in consolidating layer from total void ratio change. (CE371 Ref p.3)",
          ref:"CE371 Ref p.3",
          vars:{
            "ev":  { sym:"εv",      desc:"Volumetric strain",           units:["dimensionless"], toBase:[1] },
            "deTOT":{ sym:"ΔeTOT",  desc:"Total change in void ratio",  units:["dimensionless"], toBase:[1] },
            "e0":  { sym:"e0",      desc:"Initial void ratio",           units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "ev":    v=>({ val:v.deTOT/(1+v.e0),   rearr:"εv = ΔeTOT / (1+e0)",   sub:"ΔeTOT="+fN(v.deTOT)+", e0="+fN(v.e0) }),
            "deTOT": v=>({ val:v.ev*(1+v.e0),       rearr:"ΔeTOT = εv × (1+e0)",   sub:"εv="+fN(v.ev)+", e0="+fN(v.e0) }),
            "e0":    v=>({ val:v.deTOT/v.ev - 1,    rearr:"e0 = ΔeTOT/εv − 1",     sub:"ΔeTOT="+fN(v.deTOT)+", εv="+fN(v.ev) })
          }
        },

        // ── Approximate Settlement at Time t ─────────────────────
        {
          id:"settle_t", name:"Approximate Settlement at Time t",
          formula:"St = Uav x Sult",
          desc:"Settlement at elapsed time using average degree of consolidation (from Tv table). (CE371 Ref p.3)",
          ref:"CE371 Ref p.3",
          vars:{
            "St":   { sym:"St",   desc:"Settlement at time t",          units:["ft","m","in"],   toBase:[1, 3.28084, 0.08333] },
            "Uav":  { sym:"Uav",  desc:"Average degree of consolidation (decimal)", units:["dimensionless"], toBase:[1] },
            "Sult": { sym:"Sult", desc:"Ultimate consolidation settlement", units:["ft","m","in"], toBase:[1, 3.28084, 0.08333] }
          },
          solvers:{
            "St":   v=>({ val:v.Uav*v.Sult,   rearr:"St = Uav × Sult",   sub:"Uav="+fN(v.Uav)+", Sult="+fN(v.Sult) }),
            "Uav":  v=>({ val:v.St/v.Sult,    rearr:"Uav = St / Sult",   sub:"St="+fN(v.St)+", Sult="+fN(v.Sult) }),
            "Sult": v=>({ val:v.St/v.Uav,     rearr:"Sult = St / Uav",   sub:"St="+fN(v.St)+", Uav="+fN(v.Uav) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 4 — EARTH PRESSURE
    // Rankine KA, KP, K0, lateral forces on retaining walls
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "earth_pressure",
      title: "Earth Pressure",
      desc:  "Rankine active/passive/at-rest coefficients, lateral forces on retaining walls",
      equations: [

        // ── Rankine Active Pressure Coefficient ──────────────────
        {
          id:"Ka", name:"Rankine Active Earth Pressure Coefficient",
          formula:"Ka = tan^2(45 - phi/2)",
          desc:"For smooth wall, c=0, level backfill. Active state (wall moves away from soil). (CE371 Ref p.5)",
          ref:"CE371 Ref p.5",
          vars:{
            "Ka":  { sym:"Ka",  desc:"Active earth pressure coefficient", units:["dimensionless"], toBase:[1] },
            "phi": { sym:"φ",   desc:"Angle of internal friction",         units:["deg"],            toBase:[1] }
          },
          solvers:{
            "Ka":  v=>({ val:Math.pow(Math.tan((45-v.phi/2)*Math.PI/180), 2),   rearr:"Ka = tan²(45° − φ/2)",   sub:"φ="+fN(v.phi)+"°" }),
            "phi": v=>({ val:2*(45 - Math.atan(Math.sqrt(v.Ka))*180/Math.PI),   rearr:"φ = 2×[45° − arctan(√Ka)]", sub:"Ka="+fN(v.Ka) })
          }
        },

        // ── Rankine Passive Pressure Coefficient ─────────────────
        {
          id:"Kp", name:"Rankine Passive Earth Pressure Coefficient",
          formula:"Kp = tan^2(45 + phi/2)",
          desc:"For smooth wall, c=0, level backfill. Passive state (wall pushes into soil). (CE371 Ref p.5)",
          ref:"CE371 Ref p.5",
          vars:{
            "Kp":  { sym:"Kp",  desc:"Passive earth pressure coefficient", units:["dimensionless"], toBase:[1] },
            "phi": { sym:"φ",   desc:"Angle of internal friction",          units:["deg"],            toBase:[1] }
          },
          solvers:{
            "Kp":  v=>({ val:Math.pow(Math.tan((45+v.phi/2)*Math.PI/180), 2),   rearr:"Kp = tan²(45° + φ/2)",      sub:"φ="+fN(v.phi)+"°" }),
            "phi": v=>({ val:2*(Math.atan(Math.sqrt(v.Kp))*180/Math.PI - 45),   rearr:"φ = 2×[arctan(√Kp) − 45°]", sub:"Kp="+fN(v.Kp) })
          }
        },

        // ── At-Rest Pressure Coefficient (NC) ────────────────────
        {
          id:"K0_NC", name:"At-Rest Earth Pressure Coefficient (NC Soil)",
          formula:"K0 = 1 - sin(phi)",
          desc:"At-rest coefficient for normally consolidated soil (Jaky's formula). (CE371 Ref p.5)",
          ref:"CE371 Ref p.5",
          vars:{
            "K0":  { sym:"K0",  desc:"At-rest pressure coefficient",  units:["dimensionless"], toBase:[1] },
            "phi": { sym:"φ",   desc:"Angle of internal friction",     units:["deg"],            toBase:[1] }
          },
          solvers:{
            "K0":  v=>({ val:1 - Math.sin(v.phi*Math.PI/180),              rearr:"K0 = 1 − sin(φ)",           sub:"φ="+fN(v.phi)+"°" }),
            "phi": v=>({ val:Math.asin(1 - v.K0)*180/Math.PI,              rearr:"φ = arcsin(1 − K0)",        sub:"K0="+fN(v.K0) })
          }
        },

        // ── At-Rest Pressure Coefficient (OC) ────────────────────
        {
          id:"K0_OC", name:"At-Rest Earth Pressure Coefficient (OC Soil)",
          formula:"K0 = (1 - sin(phi)) x OCR^sin(phi)",
          desc:"At-rest coefficient for overconsolidated soil. OCR = pc/p0 = overconsolidation ratio. (CE371 Ref p.5)",
          ref:"CE371 Ref p.5",
          vars:{
            "K0":  { sym:"K0",  desc:"At-rest pressure coefficient (OC)", units:["dimensionless"], toBase:[1] },
            "phi": { sym:"φ",   desc:"Angle of internal friction",          units:["deg"],            toBase:[1] },
            "OCR": { sym:"OCR", desc:"Overconsolidation ratio (pc/p0)",     units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "K0":  v=>({ val:(1-Math.sin(v.phi*Math.PI/180))*Math.pow(v.OCR, Math.sin(v.phi*Math.PI/180)),   rearr:"K0 = (1−sin φ)×OCR^(sin φ)",   sub:"φ="+fN(v.phi)+"°, OCR="+fN(v.OCR) }),
            "OCR": v=>({
              val:(function(){ var sphi=Math.sin(v.phi*Math.PI/180); return Math.pow(v.K0/(1-sphi), 1/sphi); })(),
              rearr:"OCR = [K0/(1−sinφ)]^(1/sinφ)",   sub:"K0="+fN(v.K0)+", φ="+fN(v.phi)+"°" })
          }
        },

        // ── Effective Vertical Stress (2-layer profile) ──────────
        {
          id:"sigma_v_2layer", name:"Effective Vertical Stress — 2-Layer Profile",
          formula:"sigma' = (gamma1 × H1) + (gamma2 × H2) - (gamma_w × H2)",
          desc:"Effective vertical stress at bottom of saturated lower layer. (CE371 Ref p.6)",
          ref:"CE371 Ref p.6",
          vars:{
            "sp":  { sym:"σ'",   desc:"Effective vertical stress at base",  units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "g1":  { sym:"γ1",   desc:"Unit weight of upper layer",          units:["lb/ft3","kN/m3"],  toBase:[1, 6.366] },
            "H1":  { sym:"H1",   desc:"Thickness of upper layer",            units:["ft","m"],           toBase:[1, 3.28084] },
            "g2":  { sym:"γ2",   desc:"Saturated unit weight of lower layer", units:["lb/ft3","kN/m3"], toBase:[1, 6.366] },
            "H2":  { sym:"H2",   desc:"Thickness of lower (saturated) layer", units:["ft","m"],          toBase:[1, 3.28084] },
            "gw":  { sym:"γ_w",  desc:"Unit weight of water",                 units:["lb/ft3","kN/m3"], toBase:[1, 6.366] }
          },
          solvers:{
            "sp":  v=>({ val:v.g1*v.H1 + v.g2*v.H2 - v.gw*v.H2,   rearr:"σ' = γ1H1 + γ2H2 − γwH2",   sub:"γ1="+fN(v.g1)+", H1="+fN(v.H1)+", γ2="+fN(v.g2)+", H2="+fN(v.H2)+", γw="+fN(v.gw) }),
            "H2":  v=>({ val:(v.sp - v.g1*v.H1)/(v.g2 - v.gw),     rearr:"H2 = (σ' − γ1H1)/(γ2 − γw)", sub:"σ'="+fN(v.sp)+", γ1="+fN(v.g1)+", H1="+fN(v.H1)+", γ2="+fN(v.g2)+", γw="+fN(v.gw) }),
            "H1":  v=>({ val:(v.sp - (v.g2-v.gw)*v.H2)/v.g1,        rearr:"H1 = [σ' − (γ2−γw)H2]/γ1",  sub:"σ'="+fN(v.sp)+", γ2="+fN(v.g2)+", H2="+fN(v.H2)+", γw="+fN(v.gw)+", γ1="+fN(v.g1) })
          }
        },

        // ── Active Lateral Force (triangular) ────────────────────
        {
          id:"Pa_tri", name:"Active Lateral Force — Triangular Pressure Diagram",
          formula:"PA = (1/2) × sigma1' × Ka × H^2",
          desc:"Total active force per unit wall length for single uniform layer. Acts at H/3 from base. (CE371 Ref p.5)",
          ref:"CE371 Ref p.5",
          vars:{
            "PA":  { sym:"PA",  desc:"Total active lateral force (per unit length)", units:["lb/ft","kip/ft","kN/m"], toBase:[1, 1000, 14.5939] },
            "g1":  { sym:"γ1",  desc:"Unit weight of soil",                           units:["lb/ft3","kN/m3"],        toBase:[1, 6.366] },
            "Ka":  { sym:"Ka",  desc:"Active pressure coefficient",                   units:["dimensionless"],          toBase:[1] },
            "H":   { sym:"H",   desc:"Wall height",                                   units:["ft","m"],                 toBase:[1, 3.28084] }
          },
          solvers:{
            "PA": v=>({ val:0.5*v.g1*v.Ka*v.H*v.H,          rearr:"PA = ½ × γ1 × Ka × H²",   sub:"γ1="+fN(v.g1)+", Ka="+fN(v.Ka)+", H="+fN(v.H) }),
            "H":  v=>({ val:Math.sqrt(2*v.PA/(v.g1*v.Ka)),  rearr:"H = sqrt(2PA/(γ1×Ka))",    sub:"PA="+fN(v.PA)+", γ1="+fN(v.g1)+", Ka="+fN(v.Ka) }),
            "Ka": v=>({ val:2*v.PA/(v.g1*v.H*v.H),          rearr:"Ka = 2PA / (γ1×H²)",       sub:"PA="+fN(v.PA)+", γ1="+fN(v.g1)+", H="+fN(v.H) }),
            "g1": v=>({ val:2*v.PA/(v.Ka*v.H*v.H),          rearr:"γ1 = 2PA / (Ka×H²)",       sub:"PA="+fN(v.PA)+", Ka="+fN(v.Ka)+", H="+fN(v.H) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 5 — BEARING CAPACITY
    // Terzaghi's bearing capacity, allowable bearing capacity
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "bearing",
      title: "Bearing Capacity",
      desc:  "Terzaghi ultimate bearing capacity, net bearing capacity, allowable bearing capacity, bearing capacity factors",
      equations: [

        // ── Terzaghi Ultimate Bearing Capacity ───────────────────
        {
          id:"q_ult", name:"Ultimate Bearing Capacity (General)",
          formula:"qu = c'NcFcsFcdFci + qNqFqsFqdFqi + (1/2)gammaBNgammaFgammasFgammaFgammai",
          desc:"Terzaghi's general bearing capacity equation. q = Df×γ. See CE371 Ref p.13 for all factors. (CE371 Ref p.13)",
          ref:"CE371 Ref p.13",
          vars:{
            "qu":    { sym:"qu",  desc:"Ultimate bearing capacity",         units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "c":     { sym:"c'",  desc:"Effective cohesion",                units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "Nc":    { sym:"Nc",  desc:"Bearing capacity factor Nc",        units:["dimensionless"],   toBase:[1] },
            "Fcs":   { sym:"Fcs", desc:"Shape factor for cohesion term",    units:["dimensionless"],   toBase:[1] },
            "Fcd":   { sym:"Fcd", desc:"Depth factor for cohesion term",    units:["dimensionless"],   toBase:[1] },
            "Fci":   { sym:"Fci", desc:"Inclination factor for cohesion",   units:["dimensionless"],   toBase:[1] },
            "q":     { sym:"q",   desc:"Surcharge stress at base (Df×γ)",   units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "Nq":    { sym:"Nq",  desc:"Bearing capacity factor Nq",        units:["dimensionless"],   toBase:[1] },
            "Fqs":   { sym:"Fqs", desc:"Shape factor for surcharge term",   units:["dimensionless"],   toBase:[1] },
            "Fqd":   { sym:"Fqd", desc:"Depth factor for surcharge term",   units:["dimensionless"],   toBase:[1] },
            "Fqi":   { sym:"Fqi", desc:"Inclination factor for surcharge",  units:["dimensionless"],   toBase:[1] },
            "gamma": { sym:"γ",   desc:"Soil unit weight",                  units:["lb/ft3","kN/m3"],  toBase:[1, 6.366] },
            "B":     { sym:"B",   desc:"Foundation width",                  units:["ft","m"],           toBase:[1, 3.28084] },
            "Ng":    { sym:"Nγ",  desc:"Bearing capacity factor Nγ",        units:["dimensionless"],   toBase:[1] },
            "Fgs":   { sym:"Fγs", desc:"Shape factor for γ term",           units:["dimensionless"],   toBase:[1] },
            "Fgd":   { sym:"Fγd", desc:"Depth factor for γ term",           units:["dimensionless"],   toBase:[1] },
            "Fgi":   { sym:"Fγi", desc:"Inclination factor for γ term",     units:["dimensionless"],   toBase:[1] }
          },
          solvers:{
            "qu": v=>({
              val: v.c*v.Nc*v.Fcs*v.Fcd*v.Fci + v.q*v.Nq*v.Fqs*v.Fqd*v.Fqi + 0.5*v.gamma*v.B*v.Ng*v.Fgs*v.Fgd*v.Fgi,
              rearr:"qu = c'NcFcsFcdFci + qNqFqsFqdFqi + ½γBNγFγsFγdFγi",
              sub:"c="+fN(v.c)+", Nc="+fN(v.Nc)+", q="+fN(v.q)+", Nq="+fN(v.Nq)+", γ="+fN(v.gamma)+", B="+fN(v.B)+", Nγ="+fN(v.Ng)
            })
          }
        },

        // ── Bearing Capacity Factor Nq ───────────────────────────
        {
          id:"Nq_factor", name:"Bearing Capacity Factor Nq",
          formula:"Nq = tan^2(45 + phi/2) × e^(pi × tan(phi))",
          desc:"Surcharge bearing capacity factor. (CE371 Ref p.14)",
          ref:"CE371 Ref p.14",
          vars:{
            "Nq":  { sym:"Nq",  desc:"Bearing capacity factor Nq",  units:["dimensionless"], toBase:[1] },
            "phi": { sym:"φ",   desc:"Angle of internal friction",   units:["deg"],            toBase:[1] }
          },
          solvers:{
            "Nq": v=>({ val:Math.pow(Math.tan((45+v.phi/2)*Math.PI/180),2)*Math.exp(Math.PI*Math.tan(v.phi*Math.PI/180)),
              rearr:"Nq = tan²(45+φ/2) × e^(π tanφ)",   sub:"φ="+fN(v.phi)+"°" })
          }
        },

        // ── Bearing Capacity Factor Nc ───────────────────────────
        {
          id:"Nc_factor", name:"Bearing Capacity Factor Nc",
          formula:"Nc = (Nq - 1) × cot(phi)",
          desc:"Cohesion bearing capacity factor. For φ=0: Nc=5.14. (CE371 Ref p.14)",
          ref:"CE371 Ref p.14",
          vars:{
            "Nc":  { sym:"Nc",  desc:"Bearing capacity factor Nc",  units:["dimensionless"], toBase:[1] },
            "Nq":  { sym:"Nq",  desc:"Bearing capacity factor Nq",  units:["dimensionless"], toBase:[1] },
            "phi": { sym:"φ",   desc:"Angle of internal friction",   units:["deg"],            toBase:[1] }
          },
          solvers:{
            "Nc": v=>({ val:(v.Nq-1)/Math.tan(v.phi*Math.PI/180),   rearr:"Nc = (Nq−1) × cot(φ)",   sub:"Nq="+fN(v.Nq)+", φ="+fN(v.phi)+"°" }),
            "Nq": v=>({ val:v.Nc*Math.tan(v.phi*Math.PI/180)+1,     rearr:"Nq = Nc×tan(φ) + 1",      sub:"Nc="+fN(v.Nc)+", φ="+fN(v.phi)+"°" })
          }
        },

        // ── Bearing Capacity Factor Ngamma ───────────────────────
        {
          id:"Ng_factor", name:"Bearing Capacity Factor Nγ",
          formula:"Ngamma = 2 × (Nq + 1) × tan(phi)",
          desc:"Unit weight bearing capacity factor. (CE371 Ref p.14)",
          ref:"CE371 Ref p.14",
          vars:{
            "Ng":  { sym:"Nγ",  desc:"Bearing capacity factor Nγ",  units:["dimensionless"], toBase:[1] },
            "Nq":  { sym:"Nq",  desc:"Bearing capacity factor Nq",  units:["dimensionless"], toBase:[1] },
            "phi": { sym:"φ",   desc:"Angle of internal friction",   units:["deg"],            toBase:[1] }
          },
          solvers:{
            "Ng": v=>({ val:2*(v.Nq+1)*Math.tan(v.phi*Math.PI/180),   rearr:"Nγ = 2(Nq+1)×tan(φ)",   sub:"Nq="+fN(v.Nq)+", φ="+fN(v.phi)+"°" }),
            "Nq": v=>({ val:v.Ng/(2*Math.tan(v.phi*Math.PI/180))-1,   rearr:"Nq = Nγ/[2tanφ] − 1",   sub:"Nγ="+fN(v.Ng)+", φ="+fN(v.phi)+"°" })
          }
        },

        // ── Net Bearing Capacity ─────────────────────────────────
        {
          id:"q_net", name:"Net Bearing Capacity",
          formula:"q_net = qu - q",
          desc:"Stress at base due to just the applied load (subtracts overburden). q = Df×γ. (CE371 Ref p.13)",
          ref:"CE371 Ref p.13",
          vars:{
            "qnet": { sym:"qnet", desc:"Net bearing capacity",     units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "qu":   { sym:"qu",   desc:"Ultimate bearing capacity", units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "q":    { sym:"q",    desc:"Overburden stress (Df×γ)", units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] }
          },
          solvers:{
            "qnet": v=>({ val:v.qu-v.q,     rearr:"qnet = qu − q",    sub:"qu="+fN(v.qu)+", q="+fN(v.q) }),
            "qu":   v=>({ val:v.qnet+v.q,   rearr:"qu = qnet + q",    sub:"qnet="+fN(v.qnet)+", q="+fN(v.q) }),
            "q":    v=>({ val:v.qu-v.qnet,  rearr:"q = qu − qnet",    sub:"qu="+fN(v.qu)+", qnet="+fN(v.qnet) })
          }
        },

        // ── Allowable Bearing Capacity ───────────────────────────
        {
          id:"q_all", name:"Allowable Bearing Capacity",
          formula:"q_all = qu / FS",
          desc:"Ultimate bearing capacity reduced by factor of safety (typically FS = 2.5–3.0). (CE371 Ref p.13)",
          ref:"CE371 Ref p.13",
          vars:{
            "qall": { sym:"qall", desc:"Allowable bearing capacity",  units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "qu":   { sym:"qu",   desc:"Ultimate bearing capacity",    units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "FS":   { sym:"FS",   desc:"Factor of safety",             units:["dimensionless"],   toBase:[1] }
          },
          solvers:{
            "qall": v=>({ val:v.qu/v.FS,     rearr:"qall = qu / FS",   sub:"qu="+fN(v.qu)+", FS="+fN(v.FS) }),
            "qu":   v=>({ val:v.qall*v.FS,   rearr:"qu = qall × FS",   sub:"qall="+fN(v.qall)+", FS="+fN(v.FS) }),
            "FS":   v=>({ val:v.qu/v.qall,   rearr:"FS = qu / qall",   sub:"qu="+fN(v.qu)+", qall="+fN(v.qall) })
          }
        },

        // ── Surcharge Stress at Foundation Base ──────────────────
        {
          id:"q_surcharge", name:"Overburden Stress at Foundation Base",
          formula:"q = Df x gamma",
          desc:"Effective overburden stress at the base of the foundation. (CE371 Ref p.13)",
          ref:"CE371 Ref p.13",
          vars:{
            "q":     { sym:"q",   desc:"Overburden stress at foundation base", units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "Df":    { sym:"Df",  desc:"Foundation depth",                      units:["ft","m"],           toBase:[1, 3.28084] },
            "gamma": { sym:"γ",   desc:"Soil unit weight",                      units:["lb/ft3","kN/m3"],  toBase:[1, 6.366] }
          },
          solvers:{
            "q":     v=>({ val:v.Df*v.gamma,   rearr:"q = Df × γ",     sub:"Df="+fN(v.Df)+", γ="+fN(v.gamma) }),
            "Df":    v=>({ val:v.q/v.gamma,    rearr:"Df = q / γ",     sub:"q="+fN(v.q)+", γ="+fN(v.gamma) }),
            "gamma": v=>({ val:v.q/v.Df,       rearr:"γ = q / Df",     sub:"q="+fN(v.q)+", Df="+fN(v.Df) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 6 — DEEP FOUNDATIONS
    // Drilled shafts and driven piles in cohesive and non-cohesive soils
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "deep_foundations",
      title: "Deep Foundations",
      desc:  "Drilled shaft and driven pile capacity — cohesive and non-cohesive soils",
      equations: [

        // ── Deep Foundation Criterion ────────────────────────────
        {
          id:"deep_criterion", name:"Deep Foundation Criterion",
          formula:"Df / B > 4.0",
          desc:"Foundation is classified as deep when embedment-to-width ratio exceeds 4. (CE371 Ref p.16)",
          ref:"CE371 Ref p.16",
          vars:{
            "ratio":{ sym:"Df/B", desc:"Embedment-to-width ratio",  units:["dimensionless"], toBase:[1] },
            "Df":   { sym:"Df",   desc:"Depth to bottom of foundation", units:["ft","m"],    toBase:[1, 3.28084] },
            "B":    { sym:"B",    desc:"Width or diameter",          units:["ft","m","in"],   toBase:[1, 3.28084, 0.08333] }
          },
          solvers:{
            "ratio": v=>({ val:v.Df/v.B,        rearr:"Df/B = Df / B",       sub:"Df="+fN(v.Df)+", B="+fN(v.B) }),
            "Df":    v=>({ val:v.ratio*v.B,      rearr:"Df = (Df/B) × B",     sub:"Df/B="+fN(v.ratio)+", B="+fN(v.B) }),
            "B":     v=>({ val:v.Df/v.ratio,     rearr:"B = Df / (Df/B)",     sub:"Df="+fN(v.Df)+", Df/B="+fN(v.ratio) })
          }
        },

        // ── General Pile Capacity ────────────────────────────────
        {
          id:"qu_pile", name:"Ultimate Pile/Shaft Capacity",
          formula:"Qu = Qp + Qs",
          desc:"Total pile capacity = end bearing + side friction. (CE371 Ref p.16)",
          ref:"CE371 Ref p.16",
          vars:{
            "Qu": { sym:"Qu", desc:"Ultimate foundation capacity", units:["kip","kN","lb"], toBase:[1, 0.22481, 1000] },
            "Qp": { sym:"Qp", desc:"Point/end bearing capacity",   units:["kip","kN","lb"], toBase:[1, 0.22481, 1000] },
            "Qs": { sym:"Qs", desc:"Side friction capacity",        units:["kip","kN","lb"], toBase:[1, 0.22481, 1000] }
          },
          solvers:{
            "Qu": v=>({ val:v.Qp+v.Qs,   rearr:"Qu = Qp + Qs",   sub:"Qp="+fN(v.Qp)+", Qs="+fN(v.Qs) }),
            "Qp": v=>({ val:v.Qu-v.Qs,   rearr:"Qp = Qu − Qs",   sub:"Qu="+fN(v.Qu)+", Qs="+fN(v.Qs) }),
            "Qs": v=>({ val:v.Qu-v.Qp,   rearr:"Qs = Qu − Qp",   sub:"Qu="+fN(v.Qu)+", Qp="+fN(v.Qp) })
          }
        },

        // ── Allowable Pile Capacity ──────────────────────────────
        {
          id:"qall_pile", name:"Allowable Pile Capacity",
          formula:"Qall = Qu / FS",
          desc:"Allowable load on pile with factor of safety. (CE371 Ref p.16)",
          ref:"CE371 Ref p.16",
          vars:{
            "Qall": { sym:"Qall", desc:"Allowable pile capacity",   units:["kip","kN","lb"], toBase:[1, 0.22481, 1000] },
            "Qu":   { sym:"Qu",   desc:"Ultimate pile capacity",     units:["kip","kN","lb"], toBase:[1, 0.22481, 1000] },
            "FS":   { sym:"FS",   desc:"Factor of safety",           units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "Qall": v=>({ val:v.Qu/v.FS,     rearr:"Qall = Qu / FS",   sub:"Qu="+fN(v.Qu)+", FS="+fN(v.FS) }),
            "Qu":   v=>({ val:v.Qall*v.FS,   rearr:"Qu = Qall × FS",   sub:"Qall="+fN(v.Qall)+", FS="+fN(v.FS) }),
            "FS":   v=>({ val:v.Qu/v.Qall,   rearr:"FS = Qu / Qall",   sub:"Qu="+fN(v.Qu)+", Qall="+fN(v.Qall) })
          }
        },

        // ── End Bearing — Cohesive Soils ─────────────────────────
        {
          id:"Qp_cohesive", name:"End Bearing Capacity — Cohesive Soils",
          formula:"Qp = 9 x Cu x Ap",
          desc:"End bearing for pile/drilled shaft in clay. Cu = undrained shear strength. (CE371 Ref p.16-17)",
          ref:"CE371 Ref p.16",
          vars:{
            "Qp": { sym:"Qp",  desc:"End bearing capacity",        units:["kip","kN","lb"],   toBase:[1, 0.22481, 1000] },
            "Cu": { sym:"Cu",  desc:"Undrained cohesion",           units:["ksf","psf","kPa"], toBase:[1, 0.001, 0.02089] },
            "Ap": { sym:"Ap",  desc:"Cross-sectional area at base", units:["ft2","in2","m2"],  toBase:[1, 0.00694, 10.7639] }
          },
          solvers:{
            "Qp": v=>({ val:9*v.Cu*v.Ap,   rearr:"Qp = 9 × Cu × Ap",   sub:"Cu="+fN(v.Cu)+", Ap="+fN(v.Ap) }),
            "Cu": v=>({ val:v.Qp/(9*v.Ap), rearr:"Cu = Qp / (9×Ap)",   sub:"Qp="+fN(v.Qp)+", Ap="+fN(v.Ap) }),
            "Ap": v=>({ val:v.Qp/(9*v.Cu), rearr:"Ap = Qp / (9×Cu)",   sub:"Qp="+fN(v.Qp)+", Cu="+fN(v.Cu) })
          }
        },

        // ── Side Friction — Cohesive Soils ───────────────────────
        {
          id:"Qs_cohesive", name:"Side Friction Capacity — Cohesive Soils",
          formula:"Qs = alpha x Cu x P x delta_L",
          desc:"Skin friction for a single layer. Sum over all layers. α ≈ 0.4 (conservative). (CE371 Ref p.16-17)",
          ref:"CE371 Ref p.16",
          vars:{
            "Qs":    { sym:"Qs",  desc:"Side friction (single layer)", units:["kip","kN","lb"],   toBase:[1, 0.22481, 1000] },
            "alpha": { sym:"α",   desc:"Adhesion factor (≈0.4)",        units:["dimensionless"],   toBase:[1] },
            "Cu":    { sym:"Cu",  desc:"Undrained cohesion",             units:["ksf","psf","kPa"], toBase:[1, 0.001, 0.02089] },
            "P":     { sym:"P",   desc:"Perimeter of pile/shaft",        units:["ft","m"],           toBase:[1, 3.28084] },
            "dL":    { sym:"ΔL",  desc:"Layer length",                   units:["ft","m"],           toBase:[1, 3.28084] }
          },
          solvers:{
            "Qs":    v=>({ val:v.alpha*v.Cu*v.P*v.dL,       rearr:"Qs = α × Cu × P × ΔL",   sub:"α="+fN(v.alpha)+", Cu="+fN(v.Cu)+", P="+fN(v.P)+", ΔL="+fN(v.dL) }),
            "Cu":    v=>({ val:v.Qs/(v.alpha*v.P*v.dL),     rearr:"Cu = Qs / (α×P×ΔL)",     sub:"Qs="+fN(v.Qs)+", α="+fN(v.alpha)+", P="+fN(v.P)+", ΔL="+fN(v.dL) }),
            "P":     v=>({ val:v.Qs/(v.alpha*v.Cu*v.dL),    rearr:"P = Qs / (α×Cu×ΔL)",     sub:"Qs="+fN(v.Qs)+", α="+fN(v.alpha)+", Cu="+fN(v.Cu)+", ΔL="+fN(v.dL) }),
            "dL":    v=>({ val:v.Qs/(v.alpha*v.Cu*v.P),     rearr:"ΔL = Qs / (α×Cu×P)",     sub:"Qs="+fN(v.Qs)+", α="+fN(v.alpha)+", Cu="+fN(v.Cu)+", P="+fN(v.P) }),
            "alpha": v=>({ val:v.Qs/(v.Cu*v.P*v.dL),        rearr:"α = Qs / (Cu×P×ΔL)",     sub:"Qs="+fN(v.Qs)+", Cu="+fN(v.Cu)+", P="+fN(v.P)+", ΔL="+fN(v.dL) })
          }
        },

        // ── Side Friction — Non-Cohesive Soils ──────────────────
        {
          id:"Qs_nc", name:"Side Friction — Non-Cohesive Soils",
          formula:"f = K0 x sigma'v x tan(delta)",
          desc:"Unit skin friction. K0 = 1−sinφ. σ'v capped at depth L'=15×dia. δ from friction table. (CE371 Ref p.17)",
          ref:"CE371 Ref p.17",
          vars:{
            "f":    { sym:"f",   desc:"Unit skin friction",            units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "K0":   { sym:"K0",  desc:"At-rest pressure coefficient",  units:["dimensionless"],   toBase:[1] },
            "sv":   { sym:"σ'v", desc:"Effective vertical stress",     units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "delta":{ sym:"δ",   desc:"Friction angle (soil-structure)", units:["deg"],            toBase:[1] }
          },
          solvers:{
            "f":    v=>({ val:v.K0*v.sv*Math.tan(v.delta*Math.PI/180),         rearr:"f = K0 × σ'v × tan(δ)",       sub:"K0="+fN(v.K0)+", σ'v="+fN(v.sv)+", δ="+fN(v.delta)+"°" }),
            "sv":   v=>({ val:v.f/(v.K0*Math.tan(v.delta*Math.PI/180)),         rearr:"σ'v = f / (K0×tan(δ))",       sub:"f="+fN(v.f)+", K0="+fN(v.K0)+", δ="+fN(v.delta)+"°" }),
            "K0":   v=>({ val:v.f/(v.sv*Math.tan(v.delta*Math.PI/180)),         rearr:"K0 = f / (σ'v×tan(δ))",       sub:"f="+fN(v.f)+", σ'v="+fN(v.sv)+", δ="+fN(v.delta)+"°" }),
            "delta":v=>({ val:Math.atan(v.f/(v.K0*v.sv))*180/Math.PI,           rearr:"δ = arctan(f / (K0×σ'v))",    sub:"f="+fN(v.f)+", K0="+fN(v.K0)+", σ'v="+fN(v.sv) })
          }
        },

        // ── Driven Pile — End Bearing Non-Cohesive ───────────────
        {
          id:"Qp_nc_pile", name:"Driven Pile End Bearing — Non-Cohesive Soils",
          formula:"Qp = Ap x q' x Nq*  (≤ Ap x q1)",
          desc:"q1 = 50×Nq*×tan(φ) [kN/m²] or 1044×Nq*×tan(φ) [psf]. Nq* from Meyerhof chart. (CE371 Ref p.17)",
          ref:"CE371 Ref p.17",
          vars:{
            "Qp":  { sym:"Qp",  desc:"End bearing capacity",               units:["kip","kN","lb"],   toBase:[1, 0.22481, 1000] },
            "Ap":  { sym:"Ap",  desc:"Pile tip cross-sectional area",       units:["ft2","in2","m2"],  toBase:[1, 0.00694, 10.7639] },
            "qp":  { sym:"q'",  desc:"Effective vertical stress at pile tip", units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "Nqs": { sym:"Nq*", desc:"Meyerhof bearing capacity factor",    units:["dimensionless"],   toBase:[1] }
          },
          solvers:{
            "Qp":  v=>({ val:v.Ap*v.qp*v.Nqs,    rearr:"Qp = Ap × q' × Nq*",   sub:"Ap="+fN(v.Ap)+", q'="+fN(v.qp)+", Nq*="+fN(v.Nqs) }),
            "Ap":  v=>({ val:v.Qp/(v.qp*v.Nqs),  rearr:"Ap = Qp / (q'×Nq*)",   sub:"Qp="+fN(v.Qp)+", q'="+fN(v.qp)+", Nq*="+fN(v.Nqs) }),
            "qp":  v=>({ val:v.Qp/(v.Ap*v.Nqs),  rearr:"q' = Qp / (Ap×Nq*)",   sub:"Qp="+fN(v.Qp)+", Ap="+fN(v.Ap)+", Nq*="+fN(v.Nqs) }),
            "Nqs": v=>({ val:v.Qp/(v.Ap*v.qp),   rearr:"Nq* = Qp / (Ap×q')",   sub:"Qp="+fN(v.Qp)+", Ap="+fN(v.Ap)+", q'="+fN(v.qp) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 7 — SLOPE STABILITY & COMPACTION
    // Cousins FS, vibroflotation, dynamic compaction
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "slope_compaction",
      title: "Slope Stability & Compaction",
      desc:  "Cousins slope stability, vibroflotation suitability, dynamic compaction depth",
      equations: [

        // ── Cousins Stability Number (lambda) ────────────────────
        {
          id:"cousins_lambda", name:"Cousins Stability Parameter (λcφ)",
          formula:"lambda_cphi = gamma x H x tan(phi) / c",
          desc:"Input to Cousins slope stability chart to find stability number NF. (CE371 Ref p.15)",
          ref:"CE371 Ref p.15",
          vars:{
            "lam":  { sym:"λcφ",  desc:"Cousins stability parameter",  units:["dimensionless"], toBase:[1] },
            "gamma":{ sym:"γ",    desc:"Soil unit weight",              units:["lb/ft3","kN/m3"], toBase:[1, 6.366] },
            "H":    { sym:"H",    desc:"Height of slope",               units:["ft","m"],          toBase:[1, 3.28084] },
            "phi":  { sym:"φ",    desc:"Angle of internal friction",    units:["deg"],             toBase:[1] },
            "c":    { sym:"c",    desc:"Cohesion",                      units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] }
          },
          solvers:{
            "lam":  v=>({ val:v.gamma*v.H*Math.tan(v.phi*Math.PI/180)/v.c,   rearr:"λcφ = γ×H×tan(φ) / c",   sub:"γ="+fN(v.gamma)+", H="+fN(v.H)+", φ="+fN(v.phi)+"°, c="+fN(v.c) }),
            "H":    v=>({ val:v.lam*v.c/(v.gamma*Math.tan(v.phi*Math.PI/180)), rearr:"H = λcφ×c / (γ×tan(φ))", sub:"λcφ="+fN(v.lam)+", c="+fN(v.c)+", γ="+fN(v.gamma)+", φ="+fN(v.phi)+"°" }),
            "c":    v=>({ val:v.gamma*v.H*Math.tan(v.phi*Math.PI/180)/v.lam,  rearr:"c = γ×H×tan(φ) / λcφ",   sub:"γ="+fN(v.gamma)+", H="+fN(v.H)+", φ="+fN(v.phi)+"°, λcφ="+fN(v.lam) }),
            "gamma":v=>({ val:v.lam*v.c/(v.H*Math.tan(v.phi*Math.PI/180)),   rearr:"γ = λcφ×c / (H×tan(φ))", sub:"λcφ="+fN(v.lam)+", c="+fN(v.c)+", H="+fN(v.H)+", φ="+fN(v.phi)+"°" })
          }
        },

        // ── Cousins Factor of Safety ─────────────────────────────
        {
          id:"cousins_FS", name:"Cousins Slope Factor of Safety",
          formula:"FS = NF x c / (gamma x H)",
          desc:"NF = stability number read from Cousins chart using λcφ and slope angle β. (CE371 Ref p.15)",
          ref:"CE371 Ref p.15",
          vars:{
            "FS":   { sym:"FS",   desc:"Factor of safety against sliding", units:["dimensionless"], toBase:[1] },
            "NF":   { sym:"NF",   desc:"Stability number (from chart)",     units:["dimensionless"], toBase:[1] },
            "c":    { sym:"c",    desc:"Cohesion",                           units:["psf","ksf","kPa"], toBase:[1, 1000, 20.8854] },
            "gamma":{ sym:"γ",    desc:"Soil unit weight",                   units:["lb/ft3","kN/m3"], toBase:[1, 6.366] },
            "H":    { sym:"H",    desc:"Height of slope",                    units:["ft","m"],          toBase:[1, 3.28084] }
          },
          solvers:{
            "FS":   v=>({ val:v.NF*v.c/(v.gamma*v.H),   rearr:"FS = NF × c / (γ×H)",   sub:"NF="+fN(v.NF)+", c="+fN(v.c)+", γ="+fN(v.gamma)+", H="+fN(v.H) }),
            "NF":   v=>({ val:v.FS*v.gamma*v.H/v.c,     rearr:"NF = FS×γ×H / c",        sub:"FS="+fN(v.FS)+", γ="+fN(v.gamma)+", H="+fN(v.H)+", c="+fN(v.c) }),
            "c":    v=>({ val:v.FS*v.gamma*v.H/v.NF,    rearr:"c = FS×γ×H / NF",        sub:"FS="+fN(v.FS)+", γ="+fN(v.gamma)+", H="+fN(v.H)+", NF="+fN(v.NF) }),
            "H":    v=>({ val:v.NF*v.c/(v.FS*v.gamma),  rearr:"H = NF×c / (FS×γ)",      sub:"NF="+fN(v.NF)+", c="+fN(v.c)+", FS="+fN(v.FS)+", γ="+fN(v.gamma) }),
            "gamma":v=>({ val:v.NF*v.c/(v.FS*v.H),      rearr:"γ = NF×c / (FS×H)",      sub:"NF="+fN(v.NF)+", c="+fN(v.c)+", FS="+fN(v.FS)+", H="+fN(v.H) })
          }
        },

        // ── Vibroflotation Suitability Number ───────────────────
        {
          id:"vibrof_SN", name:"Vibroflotation Suitability Number",
          formula:"SN = 1.7 × sqrt(3/D50^2 + 1/D20^2 + 1/D10^2)",
          desc:"Lower SN = better suitability for vibroflotation. SN < 10 is excellent. (CE371 Ref p.6)",
          ref:"CE371 Ref p.6",
          vars:{
            "SN":  { sym:"SN",  desc:"Suitability number",             units:["dimensionless"], toBase:[1] },
            "D50": { sym:"D50", desc:"Grain diameter at 50% passing",  units:["mm"],             toBase:[1] },
            "D20": { sym:"D20", desc:"Grain diameter at 20% passing",  units:["mm"],             toBase:[1] },
            "D10": { sym:"D10", desc:"Grain diameter at 10% passing",  units:["mm"],             toBase:[1] }
          },
          solvers:{
            "SN":  v=>({ val:1.7*Math.sqrt(3/(v.D50*v.D50) + 1/(v.D20*v.D20) + 1/(v.D10*v.D10)),
              rearr:"SN = 1.7 × sqrt(3/D50² + 1/D20² + 1/D10²)",
              sub:"D50="+fN(v.D50)+"mm, D20="+fN(v.D20)+"mm, D10="+fN(v.D10)+"mm" })
          }
        },

        // ── Dynamic Compaction Depth of Influence ───────────────
        {
          id:"dyn_compact", name:"Dynamic Compaction Depth of Influence",
          formula:"D = (1/2) × sqrt(WH × h)",
          desc:"Significant depth of densification in meters. WH = dropping weight (metric tons), h = drop height (m). 1 ton = 0.91 metric tons. (CE371 Ref p.6)",
          ref:"CE371 Ref p.6",
          vars:{
            "D":  { sym:"D",  desc:"Depth of significant densification", units:["m"],            toBase:[1] },
            "WH": { sym:"WH", desc:"Dropping weight",                     units:["metric tons"],  toBase:[1] },
            "h":  { sym:"h",  desc:"Height of drop",                      units:["m"],            toBase:[1] }
          },
          solvers:{
            "D":  v=>({ val:0.5*Math.sqrt(v.WH*v.h),     rearr:"D = (1/2) × sqrt(WH × h)",   sub:"WH="+fN(v.WH)+"t, h="+fN(v.h)+"m" }),
            "WH": v=>({ val:(2*v.D)*(2*v.D)/v.h,          rearr:"WH = (2D)² / h",             sub:"D="+fN(v.D)+"m, h="+fN(v.h)+"m" }),
            "h":  v=>({ val:(2*v.D)*(2*v.D)/v.WH,         rearr:"h = (2D)² / WH",             sub:"D="+fN(v.D)+"m, WH="+fN(v.WH)+"t" })
          }
        }
      ]
    }

  ]
};