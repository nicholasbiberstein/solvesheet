// ================================================================
// CH101 — Chemistry
// West Point — CH101 Chemistry Reference Data Card
// Equations from the "Useful Relationships" pages + reference tabs
// for data tables, solubility rules, Ka/Kb, Ksp, and more.
// To update: edit ONLY this file, then push to GitHub.
// ================================================================

window.COURSE_CH101 = {
  id:          "ch101",
  code:        "CH101",
  name:        "Chemistry",
  description: "Stoichiometry, thermodynamics, kinetics, equilibrium, acids/bases, electrochemistry",

  tabs: [

    // ═══════════════════════════════════════════════════════════════
    // TAB 1 — STOICHIOMETRY & ATOMIC STRUCTURE
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "stoich",
      title: "Stoichiometry & Atomic",
      desc:  "Percent error, percent yield, mass percent, molarity, molality, photon energy, de Broglie wavelength, kinetic energy of electron",
      equations: [

        // ── Percent Error ─────────────────────────────────────────
        {
          id:"pct_error", name:"Percent Error",
          formula:"% error = |experimental - accepted| / accepted × 100",
          desc:"Measures accuracy of an experimental result relative to the accepted value.",
          ref:"CH101 Ref p.3",
          vars:{
            "err": { sym:"% error", desc:"Percent error",        units:["%"],  toBase:[1] },
            "exp": { sym:"exp",     desc:"Experimental value",   units:["(same as accepted)"], toBase:[1] },
            "acc": { sym:"acc",     desc:"Accepted value",        units:["(same as exp)"],      toBase:[1] }
          },
          solvers:{
            "err": v=>({ val:Math.abs(v.exp-v.acc)/v.acc*100,   rearr:"% error = |exp−acc|/acc × 100",   sub:"exp="+fN(v.exp)+", acc="+fN(v.acc) }),
            "exp": v=>({ val:v.acc*(1+v.err/100),               rearr:"exp = acc × (1 + %error/100)",    sub:"acc="+fN(v.acc)+", %err="+fN(v.err)+"%" })
          }
        },

        // ── Percent Yield ─────────────────────────────────────────
        {
          id:"pct_yield", name:"Percent Yield",
          formula:"% yield = (actual yield / theoretical yield) × 100",
          desc:"Compares actual product obtained to the maximum theoretically possible.",
          ref:"CH101 Ref p.3",
          vars:{
            "py":  { sym:"% yield", desc:"Percent yield",        units:["%"],  toBase:[1] },
            "act": { sym:"actual",  desc:"Actual yield",          units:["g","mol"], toBase:[1] },
            "thy": { sym:"theor",   desc:"Theoretical yield",    units:["g","mol"], toBase:[1] }
          },
          solvers:{
            "py":  v=>({ val:v.act/v.thy*100,    rearr:"% yield = actual/theoretical × 100",   sub:"actual="+fN(v.act)+", theor="+fN(v.thy) }),
            "act": v=>({ val:v.py/100*v.thy,     rearr:"actual = (% yield/100) × theoretical", sub:"% yield="+fN(v.py)+"%, theor="+fN(v.thy) }),
            "thy": v=>({ val:v.act/(v.py/100),   rearr:"theoretical = actual / (% yield/100)", sub:"actual="+fN(v.act)+", % yield="+fN(v.py)+"%" })
          }
        },

        // ── Mass Percent ──────────────────────────────────────────
        {
          id:"mass_pct", name:"Mass Percent of Element X",
          formula:"mass% X = (mass of X in 1 mol compound / molar mass of compound) × 100",
          desc:"Fraction by mass of element X in a compound.",
          ref:"CH101 Ref p.3",
          vars:{
            "mp":  { sym:"mass% X", desc:"Mass percent of X",              units:["%"],     toBase:[1] },
            "mX":  { sym:"m_X",     desc:"Mass of element X in 1 mol cmpd", units:["g/mol"], toBase:[1] },
            "MM":  { sym:"MM",      desc:"Molar mass of compound",          units:["g/mol"], toBase:[1] }
          },
          solvers:{
            "mp":  v=>({ val:v.mX/v.MM*100,    rearr:"mass% = (m_X / MM) × 100",   sub:"m_X="+fN(v.mX)+", MM="+fN(v.MM) }),
            "mX":  v=>({ val:v.mp/100*v.MM,    rearr:"m_X = (mass%/100) × MM",     sub:"mass%="+fN(v.mp)+"%, MM="+fN(v.MM) }),
            "MM":  v=>({ val:v.mX/(v.mp/100),  rearr:"MM = m_X / (mass%/100)",     sub:"m_X="+fN(v.mX)+", mass%="+fN(v.mp)+"%" })
          }
        },

        // ── Molarity ──────────────────────────────────────────────
        {
          id:"molarity", name:"Molarity",
          formula:"M = moles solute / volume of solution (L)",
          desc:"Concentration in moles of solute per liter of solution.",
          ref:"CH101 Ref p.3",
          vars:{
            "M":   { sym:"M",    desc:"Molarity",             units:["mol/L"],  toBase:[1] },
            "n":   { sym:"n",    desc:"Moles of solute",       units:["mol"],    toBase:[1] },
            "V":   { sym:"V",    desc:"Volume of solution",    units:["L","mL"], toBase:[1, 0.001] }
          },
          solvers:{
            "M": v=>({ val:v.n/v.V,    rearr:"M = n / V",    sub:"n="+fN(v.n)+"mol, V="+fN(v.V)+"L" }),
            "n": v=>({ val:v.M*v.V,    rearr:"n = M × V",    sub:"M="+fN(v.M)+", V="+fN(v.V)+"L" }),
            "V": v=>({ val:v.n/v.M,    rearr:"V = n / M",    sub:"n="+fN(v.n)+"mol, M="+fN(v.M) })
          }
        },

        // ── Dilution ──────────────────────────────────────────────
        {
          id:"dilution", name:"Dilution (M₁V₁ = M₂V₂)",
          formula:"M1 * V1 = M2 * V2",
          desc:"Moles of solute are conserved when a solution is diluted.",
          ref:"CH101 Ref p.3",
          vars:{
            "M1": { sym:"M₁", desc:"Initial molarity",   units:["mol/L"],  toBase:[1] },
            "V1": { sym:"V₁", desc:"Initial volume",      units:["L","mL"], toBase:[1, 0.001] },
            "M2": { sym:"M₂", desc:"Final molarity",      units:["mol/L"],  toBase:[1] },
            "V2": { sym:"V₂", desc:"Final volume",        units:["L","mL"], toBase:[1, 0.001] }
          },
          solvers:{
            "M1": v=>({ val:v.M2*v.V2/v.V1,   rearr:"M₁ = M₂V₂/V₁",   sub:"M₂="+fN(v.M2)+", V₂="+fN(v.V2)+", V₁="+fN(v.V1) }),
            "V1": v=>({ val:v.M2*v.V2/v.M1,   rearr:"V₁ = M₂V₂/M₁",   sub:"M₂="+fN(v.M2)+", V₂="+fN(v.V2)+", M₁="+fN(v.M1) }),
            "M2": v=>({ val:v.M1*v.V1/v.V2,   rearr:"M₂ = M₁V₁/V₂",   sub:"M₁="+fN(v.M1)+", V₁="+fN(v.V1)+", V₂="+fN(v.V2) }),
            "V2": v=>({ val:v.M1*v.V1/v.M2,   rearr:"V₂ = M₁V₁/M₂",   sub:"M₁="+fN(v.M1)+", V₁="+fN(v.V1)+", M₂="+fN(v.M2) })
          }
        },

        // ── Molality ──────────────────────────────────────────────
        {
          id:"molality", name:"Molality",
          formula:"m = moles solute / mass solvent (kg)",
          desc:"Concentration in moles of solute per kilogram of solvent. Used for colligative properties.",
          ref:"CH101 Ref p.3",
          vars:{
            "mol": { sym:"m",    desc:"Molality",            units:["mol/kg"], toBase:[1] },
            "n":   { sym:"n",    desc:"Moles of solute",      units:["mol"],    toBase:[1] },
            "kg":  { sym:"kg",   desc:"Mass of solvent",      units:["kg","g"], toBase:[1, 0.001] }
          },
          solvers:{
            "mol": v=>({ val:v.n/v.kg,    rearr:"m = n / kg_solvent",   sub:"n="+fN(v.n)+"mol, kg="+fN(v.kg)+"kg" }),
            "n":   v=>({ val:v.mol*v.kg,  rearr:"n = m × kg_solvent",   sub:"m="+fN(v.mol)+", kg="+fN(v.kg)+"kg" }),
            "kg":  v=>({ val:v.n/v.mol,   rearr:"kg = n / m",           sub:"n="+fN(v.n)+"mol, m="+fN(v.mol) })
          }
        },

        // ── Photon Energy ─────────────────────────────────────────
        {
          id:"photon_e", name:"Photon Energy",
          formula:"E = h * nu = h * c / lambda",
          desc:"Energy of a photon. h = 6.626×10⁻³⁴ J·s, c = 2.998×10⁸ m/s.",
          ref:"CH101 Ref p.3",
          vars:{
            "E":   { sym:"E",   desc:"Photon energy",        units:["J","eV"],   toBase:[1, 1.60218e-19] },
            "h":   { sym:"h",   desc:"Planck's constant (6.626e-34 J·s)", units:["J·s"], toBase:[1] },
            "nu":  { sym:"ν",   desc:"Frequency",            units:["Hz"],       toBase:[1] },
            "c":   { sym:"c",   desc:"Speed of light (2.998e8 m/s)", units:["m/s"], toBase:[1] },
            "lam": { sym:"λ",   desc:"Wavelength",           units:["m","nm"],   toBase:[1, 1e-9] }
          },
          solvers:{
            "E":   v=>({ val:v.h*v.nu,           rearr:"E = hν",          sub:"h="+fN(v.h)+", ν="+fN(v.nu) }),
            "nu":  v=>({ val:v.E/v.h,            rearr:"ν = E/h",         sub:"E="+fN(v.E)+", h="+fN(v.h) }),
            "lam": v=>({ val:v.h*v.c/v.E,        rearr:"λ = hc/E",        sub:"h="+fN(v.h)+", c="+fN(v.c)+", E="+fN(v.E) }),
            "E2":  v=>({ val:v.h*v.c/v.lam,      rearr:"E = hc/λ",        sub:"h="+fN(v.h)+", c="+fN(v.c)+", λ="+fN(v.lam) })
          }
        },

        // ── de Broglie Wavelength ─────────────────────────────────
        {
          id:"debroglie", name:"de Broglie Wavelength",
          formula:"lambda = h / (m * v)",
          desc:"Wave-like wavelength of a particle. h = 6.626×10⁻³⁴ J·s.",
          ref:"CH101 Ref p.3",
          vars:{
            "lam": { sym:"λ",  desc:"Wavelength",          units:["m","nm"],   toBase:[1, 1e-9] },
            "h":   { sym:"h",  desc:"Planck's constant",   units:["J·s"],      toBase:[1] },
            "m":   { sym:"m",  desc:"Mass of particle",    units:["kg","g"],   toBase:[1, 0.001] },
            "v":   { sym:"v",  desc:"Speed of particle",   units:["m/s"],      toBase:[1] }
          },
          solvers:{
            "lam": v=>({ val:v.h/(v.m*v.v),          rearr:"λ = h/(mv)",      sub:"h="+fN(v.h)+", m="+fN(v.m)+", v="+fN(v.v) }),
            "v":   v=>({ val:v.h/(v.m*v.lam),         rearr:"v = h/(mλ)",      sub:"h="+fN(v.h)+", m="+fN(v.m)+", λ="+fN(v.lam) }),
            "m":   v=>({ val:v.h/(v.v*v.lam),         rearr:"m = h/(vλ)",      sub:"h="+fN(v.h)+", v="+fN(v.v)+", λ="+fN(v.lam) })
          }
        },

        // ── Kinetic Energy (Electron/Particle) ───────────────────
        {
          id:"ke_particle", name:"Kinetic Energy of a Particle",
          formula:"KE = (1/2) * m * v^2",
          desc:"Kinetic energy of any particle (electron, atom, etc.).",
          ref:"CH101 Ref p.3",
          vars:{
            "KE": { sym:"KE", desc:"Kinetic energy",   units:["J","eV"],  toBase:[1, 1.60218e-19] },
            "m":  { sym:"m",  desc:"Mass",              units:["kg","g"],  toBase:[1, 0.001] },
            "v":  { sym:"v",  desc:"Speed",             units:["m/s"],     toBase:[1] }
          },
          solvers:{
            "KE": v=>({ val:0.5*v.m*v.v*v.v,          rearr:"KE = ½mv²",      sub:"m="+fN(v.m)+", v="+fN(v.v) }),
            "v":  v=>({ val:Math.sqrt(2*v.KE/v.m),    rearr:"v = √(2KE/m)",   sub:"KE="+fN(v.KE)+", m="+fN(v.m) }),
            "m":  v=>({ val:2*v.KE/(v.v*v.v),         rearr:"m = 2KE/v²",     sub:"KE="+fN(v.KE)+", v="+fN(v.v) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 2 — THERMODYNAMICS
    // ΔG, ΔH, ΔS, Hess's law, Gibbs, heat capacity
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "thermo",
      title: "Thermodynamics",
      desc:  "Enthalpy, entropy, Gibbs free energy, Hess's law, heat capacity, work",
      equations: [

        // ── Gibbs Free Energy ─────────────────────────────────────
        {
          id:"gibbs", name:"Gibbs Free Energy",
          formula:"delta_G = delta_H - T * delta_S",
          desc:"ΔG < 0 spontaneous, ΔG > 0 non-spontaneous, ΔG = 0 at equilibrium.",
          ref:"CH101 Ref p.3",
          vars:{
            "dG": { sym:"ΔG",  desc:"Gibbs free energy change",  units:["kJ/mol","J/mol"], toBase:[1, 0.001] },
            "dH": { sym:"ΔH",  desc:"Enthalpy change",           units:["kJ/mol","J/mol"], toBase:[1, 0.001] },
            "T":  { sym:"T",   desc:"Temperature",               units:["K"],              toBase:[1] },
            "dS": { sym:"ΔS",  desc:"Entropy change",            units:["kJ/(mol·K)","J/(mol·K)"], toBase:[1, 0.001] }
          },
          solvers:{
            "dG": v=>({ val:v.dH-v.T*v.dS,        rearr:"ΔG = ΔH − TΔS",        sub:"ΔH="+fN(v.dH)+", T="+fN(v.T)+", ΔS="+fN(v.dS) }),
            "dH": v=>({ val:v.dG+v.T*v.dS,        rearr:"ΔH = ΔG + TΔS",        sub:"ΔG="+fN(v.dG)+", T="+fN(v.T)+", ΔS="+fN(v.dS) }),
            "T":  v=>({ val:(v.dH-v.dG)/v.dS,     rearr:"T = (ΔH − ΔG) / ΔS",  sub:"ΔH="+fN(v.dH)+", ΔG="+fN(v.dG)+", ΔS="+fN(v.dS) }),
            "dS": v=>({ val:(v.dH-v.dG)/v.T,      rearr:"ΔS = (ΔH − ΔG) / T",  sub:"ΔH="+fN(v.dH)+", ΔG="+fN(v.dG)+", T="+fN(v.T) })
          }
        },

        // ── ΔG from standard and Q ────────────────────────────────
        {
          id:"gibbs_Q", name:"ΔG from Standard ΔG° and Reaction Quotient Q",
          formula:"delta_G = delta_G° + RT * ln(Q)",
          desc:"ΔG° from standard conditions. R = 8.314 J/(mol·K). At equilibrium: ΔG = 0, Q = K.",
          ref:"CH101 Ref p.3",
          vars:{
            "dG":  { sym:"ΔG",   desc:"Actual ΔG",              units:["kJ/mol"], toBase:[1] },
            "dG0": { sym:"ΔG°",  desc:"Standard ΔG°",           units:["kJ/mol"], toBase:[1] },
            "R":   { sym:"R",    desc:"Gas constant (8.314e-3 kJ/(mol·K))", units:["kJ/(mol·K)"], toBase:[1] },
            "T":   { sym:"T",    desc:"Temperature",             units:["K"],      toBase:[1] },
            "Q":   { sym:"Q",    desc:"Reaction quotient",       units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "dG":  v=>({ val:v.dG0+v.R*v.T*Math.log(v.Q),          rearr:"ΔG = ΔG° + RT ln Q",      sub:"ΔG°="+fN(v.dG0)+", R="+fN(v.R)+", T="+fN(v.T)+", Q="+fN(v.Q) }),
            "dG0": v=>({ val:v.dG-v.R*v.T*Math.log(v.Q),            rearr:"ΔG° = ΔG − RT ln Q",     sub:"ΔG="+fN(v.dG)+", R="+fN(v.R)+", T="+fN(v.T)+", Q="+fN(v.Q) }),
            "Q":   v=>({ val:Math.exp((v.dG-v.dG0)/(v.R*v.T)),      rearr:"Q = e^((ΔG−ΔG°)/RT)",    sub:"ΔG="+fN(v.dG)+", ΔG°="+fN(v.dG0)+", R="+fN(v.R)+", T="+fN(v.T) }),
            "T":   v=>({ val:(v.dG-v.dG0)/(v.R*Math.log(v.Q)),      rearr:"T = (ΔG−ΔG°)/(R ln Q)", sub:"ΔG="+fN(v.dG)+", ΔG°="+fN(v.dG0)+", R="+fN(v.R)+", Q="+fN(v.Q) })
          }
        },

        // ── ΔG° and K ─────────────────────────────────────────────
        {
          id:"gibbs_K", name:"ΔG° and Equilibrium Constant K",
          formula:"delta_G° = -RT * ln(K)",
          desc:"Relates standard free energy to the equilibrium constant. R = 8.314 J/(mol·K). At 298K: ΔG° = −(0.008314)(298) ln K.",
          ref:"CH101 Ref p.3",
          vars:{
            "dG0": { sym:"ΔG°", desc:"Standard ΔG°",           units:["kJ/mol"], toBase:[1] },
            "R":   { sym:"R",   desc:"Gas constant (8.314e-3)", units:["kJ/(mol·K)"], toBase:[1] },
            "T":   { sym:"T",   desc:"Temperature",             units:["K"],      toBase:[1] },
            "K":   { sym:"K",   desc:"Equilibrium constant",    units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "dG0": v=>({ val:-v.R*v.T*Math.log(v.K),              rearr:"ΔG° = −RT ln K",      sub:"R="+fN(v.R)+", T="+fN(v.T)+", K="+fN(v.K) }),
            "K":   v=>({ val:Math.exp(-v.dG0/(v.R*v.T)),          rearr:"K = e^(−ΔG°/RT)",     sub:"ΔG°="+fN(v.dG0)+", R="+fN(v.R)+", T="+fN(v.T) }),
            "T":   v=>({ val:-v.dG0/(v.R*Math.log(v.K)),          rearr:"T = −ΔG°/(R ln K)",   sub:"ΔG°="+fN(v.dG0)+", R="+fN(v.R)+", K="+fN(v.K) })
          }
        },

        // ── Hess's Law / ΔH from formation ───────────────────────
        {
          id:"hess", name:"Hess's Law — ΔH from Formation",
          formula:"delta_H_rxn = sum(n * delta_Hf products) - sum(n * delta_Hf reactants)",
          desc:"ΔH°rxn = Σn·ΔHf°(products) − Σn·ΔHf°(reactants). Standard enthalpy of elements = 0.",
          ref:"CH101 Ref p.3",
          vars:{
            "dHrxn": { sym:"ΔH°rxn",  desc:"Enthalpy of reaction",             units:["kJ/mol"], toBase:[1] },
            "sumP":  { sym:"ΣΔHf°(P)",desc:"Sum of n×ΔHf° for products",       units:["kJ/mol"], toBase:[1] },
            "sumR":  { sym:"ΣΔHf°(R)",desc:"Sum of n×ΔHf° for reactants",      units:["kJ/mol"], toBase:[1] }
          },
          solvers:{
            "dHrxn": v=>({ val:v.sumP-v.sumR,    rearr:"ΔH°rxn = ΣΔHf°(products) − ΣΔHf°(reactants)",   sub:"Σprod="+fN(v.sumP)+", Σreact="+fN(v.sumR) }),
            "sumP":  v=>({ val:v.dHrxn+v.sumR,   rearr:"ΣΔHf°(products) = ΔH°rxn + ΣΔHf°(reactants)",  sub:"ΔH°rxn="+fN(v.dHrxn)+", Σreact="+fN(v.sumR) }),
            "sumR":  v=>({ val:v.sumP-v.dHrxn,   rearr:"ΣΔHf°(reactants) = ΣΔHf°(products) − ΔH°rxn",  sub:"ΔH°rxn="+fN(v.dHrxn)+", Σprod="+fN(v.sumP) })
          }
        },

        // ── Heat / q = mcΔT ───────────────────────────────────────
        {
          id:"heat_cap", name:"Heat Transfer",
          formula:"q = m * c * delta_T",
          desc:"Heat gained or lost by a substance. c = specific heat capacity (J/g·K). See reference tab for common c values.",
          ref:"CH101 Ref p.8",
          vars:{
            "q":  { sym:"q",  desc:"Heat transferred",       units:["J","kJ"],   toBase:[1, 1000] },
            "m":  { sym:"m",  desc:"Mass",                   units:["g","kg"],   toBase:[1, 1000] },
            "c":  { sym:"c",  desc:"Specific heat capacity", units:["J/(g·K)"],  toBase:[1] },
            "dT": { sym:"ΔT", desc:"Temperature change",     units:["K","°C"],   toBase:[1, 1] }
          },
          solvers:{
            "q":  v=>({ val:v.m*v.c*v.dT,     rearr:"q = mcΔT",      sub:"m="+fN(v.m)+", c="+fN(v.c)+", ΔT="+fN(v.dT) }),
            "m":  v=>({ val:v.q/(v.c*v.dT),   rearr:"m = q/(cΔT)",   sub:"q="+fN(v.q)+", c="+fN(v.c)+", ΔT="+fN(v.dT) }),
            "c":  v=>({ val:v.q/(v.m*v.dT),   rearr:"c = q/(mΔT)",   sub:"q="+fN(v.q)+", m="+fN(v.m)+", ΔT="+fN(v.dT) }),
            "dT": v=>({ val:v.q/(v.m*v.c),    rearr:"ΔT = q/(mc)",   sub:"q="+fN(v.q)+", m="+fN(v.m)+", c="+fN(v.c) })
          }
        },

        // ── ΔS° from formation ────────────────────────────────────
        {
          id:"entropy", name:"Standard Entropy Change",
          formula:"delta_S°rxn = sum(n * S° products) - sum(n * S° reactants)",
          desc:"Standard entropy of reaction from absolute entropies. Unlike ΔHf°, S° of elements ≠ 0.",
          ref:"CH101 Ref p.3",
          vars:{
            "dSrxn": { sym:"ΔS°rxn",   desc:"Entropy of reaction",         units:["J/(mol·K)"], toBase:[1] },
            "sumP":  { sym:"ΣS°(P)",   desc:"Sum of n×S° for products",    units:["J/(mol·K)"], toBase:[1] },
            "sumR":  { sym:"ΣS°(R)",   desc:"Sum of n×S° for reactants",   units:["J/(mol·K)"], toBase:[1] }
          },
          solvers:{
            "dSrxn": v=>({ val:v.sumP-v.sumR,   rearr:"ΔS°rxn = ΣS°(products) − ΣS°(reactants)",   sub:"Σprod="+fN(v.sumP)+", Σreact="+fN(v.sumR) }),
            "sumP":  v=>({ val:v.dSrxn+v.sumR,  rearr:"ΣS°(products) = ΔS°rxn + ΣS°(reactants)",   sub:"ΔS°rxn="+fN(v.dSrxn)+", Σreact="+fN(v.sumR) }),
            "sumR":  v=>({ val:v.sumP-v.dSrxn,  rearr:"ΣS°(reactants) = ΣS°(products) − ΔS°rxn",   sub:"ΔS°rxn="+fN(v.dSrxn)+", Σprod="+fN(v.sumP) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 3 — GASES & STATES OF MATTER
    // Ideal gas law, partial pressures, van't Hoff
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "gases",
      title: "Gases & States of Matter",
      desc:  "Ideal gas law, Dalton's law of partial pressures, Clausius-Clapeyron, colligative properties",
      equations: [

        // ── Ideal Gas Law ─────────────────────────────────────────
        {
          id:"ideal_gas", name:"Ideal Gas Law",
          formula:"PV = nRT",
          desc:"R = 0.08206 L·atm/(mol·K) = 8.314 J/(mol·K). STP: 1 atm, 273.15 K, 22.4 L/mol.",
          ref:"CH101 Ref p.3",
          vars:{
            "P": { sym:"P",  desc:"Pressure",           units:["atm","kPa","mmHg"], toBase:[1, 0.009869, 0.001316] },
            "V": { sym:"V",  desc:"Volume",             units:["L","mL"],           toBase:[1, 0.001] },
            "n": { sym:"n",  desc:"Moles of gas",       units:["mol"],              toBase:[1] },
            "R": { sym:"R",  desc:"Gas constant (0.08206 L·atm/mol·K)", units:["L·atm/(mol·K)"], toBase:[1] },
            "T": { sym:"T",  desc:"Temperature",        units:["K"],               toBase:[1] }
          },
          solvers:{
            "P": v=>({ val:v.n*v.R*v.T/v.V,   rearr:"P = nRT/V",   sub:"n="+fN(v.n)+", R="+fN(v.R)+", T="+fN(v.T)+", V="+fN(v.V) }),
            "V": v=>({ val:v.n*v.R*v.T/v.P,   rearr:"V = nRT/P",   sub:"n="+fN(v.n)+", R="+fN(v.R)+", T="+fN(v.T)+", P="+fN(v.P) }),
            "n": v=>({ val:v.P*v.V/(v.R*v.T), rearr:"n = PV/RT",   sub:"P="+fN(v.P)+", V="+fN(v.V)+", R="+fN(v.R)+", T="+fN(v.T) }),
            "T": v=>({ val:v.P*v.V/(v.n*v.R), rearr:"T = PV/nR",   sub:"P="+fN(v.P)+", V="+fN(v.V)+", n="+fN(v.n)+", R="+fN(v.R) })
          }
        },

        // ── Molar Mass from ideal gas ─────────────────────────────
        {
          id:"molar_mass_gas", name:"Molar Mass from Density (Gas)",
          formula:"MM = d * R * T / P",
          desc:"Molar mass of a gas from its density. d = density in g/L, P in atm, R = 0.08206.",
          ref:"CH101 Ref p.3",
          vars:{
            "MM": { sym:"MM", desc:"Molar mass",    units:["g/mol"],            toBase:[1] },
            "d":  { sym:"d",  desc:"Gas density",   units:["g/L"],              toBase:[1] },
            "R":  { sym:"R",  desc:"Gas constant",  units:["L·atm/(mol·K)"],   toBase:[1] },
            "T":  { sym:"T",  desc:"Temperature",   units:["K"],                toBase:[1] },
            "P":  { sym:"P",  desc:"Pressure",      units:["atm"],              toBase:[1] }
          },
          solvers:{
            "MM": v=>({ val:v.d*v.R*v.T/v.P,   rearr:"MM = dRT/P",   sub:"d="+fN(v.d)+", R="+fN(v.R)+", T="+fN(v.T)+", P="+fN(v.P) }),
            "d":  v=>({ val:v.MM*v.P/(v.R*v.T), rearr:"d = MM·P/RT",  sub:"MM="+fN(v.MM)+", P="+fN(v.P)+", R="+fN(v.R)+", T="+fN(v.T) }),
            "T":  v=>({ val:v.MM*v.P/(v.d*v.R), rearr:"T = MM·P/(dR)", sub:"MM="+fN(v.MM)+", P="+fN(v.P)+", d="+fN(v.d)+", R="+fN(v.R) })
          }
        },

        // ── Dalton's Law ──────────────────────────────────────────
        {
          id:"dalton", name:"Dalton's Law of Partial Pressures",
          formula:"P_total = P1 + P2 + ... + Pn",
          desc:"Total pressure of a gas mixture equals sum of partial pressures of each component.",
          ref:"CH101 Ref p.3",
          vars:{
            "Ptot": { sym:"P_total", desc:"Total pressure",      units:["atm","kPa"], toBase:[1, 0.009869] },
            "P1":   { sym:"P₁",     desc:"Partial pressure gas 1", units:["atm","kPa"], toBase:[1, 0.009869] },
            "P2":   { sym:"P₂",     desc:"Partial pressure gas 2", units:["atm","kPa"], toBase:[1, 0.009869] }
          },
          solvers:{
            "Ptot": v=>({ val:v.P1+v.P2,      rearr:"P_total = P₁ + P₂ (+ others)",   sub:"P₁="+fN(v.P1)+", P₂="+fN(v.P2) }),
            "P1":   v=>({ val:v.Ptot-v.P2,    rearr:"P₁ = P_total − P₂",              sub:"P_total="+fN(v.Ptot)+", P₂="+fN(v.P2) }),
            "P2":   v=>({ val:v.Ptot-v.P1,    rearr:"P₂ = P_total − P₁",              sub:"P_total="+fN(v.Ptot)+", P₁="+fN(v.P1) })
          }
        },

        // ── Clausius-Clapeyron ────────────────────────────────────
        {
          id:"clausius", name:"Clausius-Clapeyron Equation",
          formula:"ln(P2/P1) = -(delta_H_vap/R) * (1/T2 - 1/T1)",
          desc:"Relates vapor pressure to temperature. ΔHvap in J/mol, R = 8.314 J/(mol·K).",
          ref:"CH101 Ref p.3",
          vars:{
            "P2":    { sym:"P₂",     desc:"Vapor pressure at T₂",  units:["atm","mmHg","kPa"], toBase:[1] },
            "P1":    { sym:"P₁",     desc:"Vapor pressure at T₁",  units:["atm","mmHg","kPa"], toBase:[1] },
            "dHvap": { sym:"ΔH_vap", desc:"Enthalpy of vaporization", units:["J/mol","kJ/mol"], toBase:[1, 1000] },
            "R":     { sym:"R",      desc:"Gas constant (8.314 J/mol·K)", units:["J/(mol·K)"], toBase:[1] },
            "T1":    { sym:"T₁",     desc:"Initial temperature",    units:["K"],               toBase:[1] },
            "T2":    { sym:"T₂",     desc:"Final temperature",       units:["K"],               toBase:[1] }
          },
          solvers:{
            "P2":    v=>({ val:v.P1*Math.exp(-v.dHvap/v.R*(1/v.T2-1/v.T1)),
              rearr:"P₂ = P₁ × e^[−ΔHvap/R × (1/T₂−1/T₁)]",   sub:"P₁="+fN(v.P1)+", ΔHvap="+fN(v.dHvap)+", T₁="+fN(v.T1)+", T₂="+fN(v.T2) }),
            "T2":    v=>({
              val:1/(1/v.T1 - v.R/v.dHvap*Math.log(v.P2/v.P1)),
              rearr:"T₂ = 1/[1/T₁ − (R/ΔHvap)×ln(P₂/P₁)]",    sub:"T₁="+fN(v.T1)+", P₁="+fN(v.P1)+", P₂="+fN(v.P2)+", ΔHvap="+fN(v.dHvap) }),
            "dHvap": v=>({ val:-v.R*Math.log(v.P2/v.P1)/(1/v.T2-1/v.T1),
              rearr:"ΔHvap = −R×ln(P₂/P₁)/(1/T₂−1/T₁)",        sub:"P₁="+fN(v.P1)+", P₂="+fN(v.P2)+", T₁="+fN(v.T1)+", T₂="+fN(v.T2) })
          }
        },

        // ── Boiling Point Elevation ───────────────────────────────
        {
          id:"bp_elev", name:"Boiling Point Elevation (Colligative)",
          formula:"delta_T_b = i * Kb * m",
          desc:"ΔTb = elevation of boiling point. i = van't Hoff factor, Kb = ebullioscopic constant, m = molality.",
          ref:"CH101 Ref p.3",
          vars:{
            "dTb": { sym:"ΔTb", desc:"Boiling point elevation",  units:["°C","K"],   toBase:[1, 1] },
            "i":   { sym:"i",   desc:"van't Hoff factor",         units:["dimensionless"], toBase:[1] },
            "Kb":  { sym:"Kb",  desc:"Ebullioscopic constant",    units:["°C·kg/mol"], toBase:[1] },
            "m":   { sym:"m",   desc:"Molality",                  units:["mol/kg"],   toBase:[1] }
          },
          solvers:{
            "dTb": v=>({ val:v.i*v.Kb*v.m,     rearr:"ΔTb = i × Kb × m",    sub:"i="+fN(v.i)+", Kb="+fN(v.Kb)+", m="+fN(v.m) }),
            "m":   v=>({ val:v.dTb/(v.i*v.Kb), rearr:"m = ΔTb / (i×Kb)",    sub:"ΔTb="+fN(v.dTb)+", i="+fN(v.i)+", Kb="+fN(v.Kb) }),
            "i":   v=>({ val:v.dTb/(v.Kb*v.m), rearr:"i = ΔTb / (Kb×m)",    sub:"ΔTb="+fN(v.dTb)+", Kb="+fN(v.Kb)+", m="+fN(v.m) })
          }
        },

        // ── Freezing Point Depression ─────────────────────────────
        {
          id:"fp_dep", name:"Freezing Point Depression (Colligative)",
          formula:"delta_T_f = i * Kf * m",
          desc:"ΔTf = depression of freezing point. Kf = cryoscopic constant.",
          ref:"CH101 Ref p.3",
          vars:{
            "dTf": { sym:"ΔTf", desc:"Freezing point depression", units:["°C","K"],   toBase:[1, 1] },
            "i":   { sym:"i",   desc:"van't Hoff factor",          units:["dimensionless"], toBase:[1] },
            "Kf":  { sym:"Kf",  desc:"Cryoscopic constant",        units:["°C·kg/mol"], toBase:[1] },
            "m":   { sym:"m",   desc:"Molality",                   units:["mol/kg"],   toBase:[1] }
          },
          solvers:{
            "dTf": v=>({ val:v.i*v.Kf*v.m,     rearr:"ΔTf = i × Kf × m",    sub:"i="+fN(v.i)+", Kf="+fN(v.Kf)+", m="+fN(v.m) }),
            "m":   v=>({ val:v.dTf/(v.i*v.Kf), rearr:"m = ΔTf / (i×Kf)",    sub:"ΔTf="+fN(v.dTf)+", i="+fN(v.i)+", Kf="+fN(v.Kf) }),
            "i":   v=>({ val:v.dTf/(v.Kf*v.m), rearr:"i = ΔTf / (Kf×m)",    sub:"ΔTf="+fN(v.dTf)+", Kf="+fN(v.Kf)+", m="+fN(v.m) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 4 — EQUILIBRIUM & KINETICS
    // Ka, Kb, Kw, rate laws, Arrhenius, integrated rate laws
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "equil_kinetics",
      title: "Equilibrium & Kinetics",
      desc:  "Equilibrium expressions, Ka, Kb, Kw, rate laws, Arrhenius equation, integrated rate laws",
      equations: [

        // ── Equilibrium Constant Expression ──────────────────────
        {
          id:"Kc", name:"Equilibrium Constant Expression (Kc)",
          formula:"Kc = [products]^n / [reactants]^m",
          desc:"For aA + bB ⇌ cC + dD: Kc = [C]^c[D]^d / ([A]^a[B]^b). Pure solids/liquids omitted.",
          ref:"CH101 Ref p.3",
          vars:{
            "Kc":  { sym:"Kc",  desc:"Equilibrium constant",           units:["dimensionless"], toBase:[1] },
            "Kp":  { sym:"Kp",  desc:"Kp (pressure-based)",            units:["dimensionless"], toBase:[1] },
            "R":   { sym:"R",   desc:"Gas constant (0.08206 L·atm/mol·K)", units:["L·atm/(mol·K)"], toBase:[1] },
            "T":   { sym:"T",   desc:"Temperature",                    units:["K"],              toBase:[1] },
            "dn":  { sym:"Δn",  desc:"Moles gas products − reactants", units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "Kc": v=>({ val:v.Kp/Math.pow(v.R*v.T, v.dn),   rearr:"Kc = Kp / (RT)^Δn",   sub:"Kp="+fN(v.Kp)+", R="+fN(v.R)+", T="+fN(v.T)+", Δn="+fN(v.dn) }),
            "Kp": v=>({ val:v.Kc*Math.pow(v.R*v.T, v.dn),   rearr:"Kp = Kc × (RT)^Δn",   sub:"Kc="+fN(v.Kc)+", R="+fN(v.R)+", T="+fN(v.T)+", Δn="+fN(v.dn) })
          }
        },

        // ── Van't Hoff Equation ───────────────────────────────────
        {
          id:"vant_hoff", name:"Van't Hoff Equation (K at two temperatures)",
          formula:"ln(K2/K1) = -(delta_H/R) * (1/T2 - 1/T1)",
          desc:"How equilibrium constant changes with temperature. R = 8.314 J/(mol·K).",
          ref:"CH101 Ref p.3",
          vars:{
            "K2":  { sym:"K₂",  desc:"K at temperature T₂",    units:["dimensionless"], toBase:[1] },
            "K1":  { sym:"K₁",  desc:"K at temperature T₁",    units:["dimensionless"], toBase:[1] },
            "dH":  { sym:"ΔH",  desc:"Enthalpy of reaction",    units:["J/mol","kJ/mol"], toBase:[1, 1000] },
            "R":   { sym:"R",   desc:"Gas constant (8.314)",    units:["J/(mol·K)"],    toBase:[1] },
            "T1":  { sym:"T₁",  desc:"Initial temperature",     units:["K"],             toBase:[1] },
            "T2":  { sym:"T₂",  desc:"Final temperature",       units:["K"],             toBase:[1] }
          },
          solvers:{
            "K2": v=>({ val:v.K1*Math.exp(-v.dH/v.R*(1/v.T2-1/v.T1)),
              rearr:"K₂ = K₁ × e^[−ΔH/R×(1/T₂−1/T₁)]",   sub:"K₁="+fN(v.K1)+", ΔH="+fN(v.dH)+", T₁="+fN(v.T1)+", T₂="+fN(v.T2) }),
            "T2": v=>({ val:1/(1/v.T1 - v.R/v.dH*Math.log(v.K2/v.K1)),
              rearr:"T₂ = 1/[1/T₁ − (R/ΔH)×ln(K₂/K₁)]",  sub:"K₁="+fN(v.K1)+", K₂="+fN(v.K2)+", T₁="+fN(v.T1)+", ΔH="+fN(v.dH) })
          }
        },

        // ── Rate Law ──────────────────────────────────────────────
        {
          id:"rate_law", name:"Rate Law",
          formula:"rate = k * [A]^m * [B]^n",
          desc:"For two reactants A and B. m, n = reaction orders determined experimentally.",
          ref:"CH101 Ref p.4",
          vars:{
            "rate": { sym:"rate",  desc:"Reaction rate",      units:["mol/(L·s)"], toBase:[1] },
            "k":    { sym:"k",     desc:"Rate constant",       units:["(varies)"],  toBase:[1] },
            "A":    { sym:"[A]",   desc:"Concentration of A", units:["mol/L"],     toBase:[1] },
            "m":    { sym:"m",     desc:"Order w.r.t. A",     units:["dimensionless"], toBase:[1] },
            "B":    { sym:"[B]",   desc:"Concentration of B", units:["mol/L"],     toBase:[1] },
            "n":    { sym:"n",     desc:"Order w.r.t. B",     units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "rate": v=>({ val:v.k*Math.pow(v.A,v.m)*Math.pow(v.B,v.n),     rearr:"rate = k[A]^m[B]^n",    sub:"k="+fN(v.k)+", [A]="+fN(v.A)+", m="+fN(v.m)+", [B]="+fN(v.B)+", n="+fN(v.n) }),
            "k":    v=>({ val:v.rate/(Math.pow(v.A,v.m)*Math.pow(v.B,v.n)), rearr:"k = rate/([A]^m[B]^n)", sub:"rate="+fN(v.rate)+", [A]="+fN(v.A)+", m="+fN(v.m)+", [B]="+fN(v.B)+", n="+fN(v.n) })
          }
        },

        // ── Arrhenius Equation ────────────────────────────────────
        {
          id:"arrhenius", name:"Arrhenius Equation",
          formula:"k = A * e^(-Ea / (R * T))",
          desc:"Rate constant dependence on temperature. Ea = activation energy, A = frequency factor, R = 8.314 J/(mol·K).",
          ref:"CH101 Ref p.3",
          vars:{
            "k":  { sym:"k",  desc:"Rate constant",       units:["(varies)"],  toBase:[1] },
            "A":  { sym:"A",  desc:"Frequency factor",    units:["(same as k)"], toBase:[1] },
            "Ea": { sym:"Ea", desc:"Activation energy",   units:["J/mol","kJ/mol"], toBase:[1, 1000] },
            "R":  { sym:"R",  desc:"Gas constant (8.314)", units:["J/(mol·K)"], toBase:[1] },
            "T":  { sym:"T",  desc:"Temperature",         units:["K"],          toBase:[1] }
          },
          solvers:{
            "k":  v=>({ val:v.A*Math.exp(-v.Ea/(v.R*v.T)),               rearr:"k = A·e^(−Ea/RT)",       sub:"A="+fN(v.A)+", Ea="+fN(v.Ea)+", R="+fN(v.R)+", T="+fN(v.T) }),
            "Ea": v=>({ val:-v.R*v.T*Math.log(v.k/v.A),                   rearr:"Ea = −RT·ln(k/A)",       sub:"k="+fN(v.k)+", A="+fN(v.A)+", R="+fN(v.R)+", T="+fN(v.T) }),
            "T":  v=>({ val:-v.Ea/(v.R*Math.log(v.k/v.A)),                rearr:"T = −Ea / (R·ln(k/A))", sub:"k="+fN(v.k)+", A="+fN(v.A)+", Ea="+fN(v.Ea)+", R="+fN(v.R) })
          }
        },

        // ── First-Order Integrated Rate Law ───────────────────────
        {
          id:"first_order", name:"First-Order Integrated Rate Law",
          formula:"ln[A]t = -k*t + ln[A]0",
          desc:"For first-order reactions. Half-life: t½ = ln2/k = 0.693/k.",
          ref:"CH101 Ref p.4",
          vars:{
            "At": { sym:"[A]t",  desc:"Concentration at time t",    units:["mol/L"], toBase:[1] },
            "A0": { sym:"[A]₀",  desc:"Initial concentration",      units:["mol/L"], toBase:[1] },
            "k":  { sym:"k",     desc:"First-order rate constant",  units:["1/s","1/min"], toBase:[1, 0.01667] },
            "t":  { sym:"t",     desc:"Time",                       units:["s","min"],     toBase:[1, 60] }
          },
          solvers:{
            "At": v=>({ val:v.A0*Math.exp(-v.k*v.t),              rearr:"[A]t = [A]₀ × e^(−kt)",    sub:"[A]₀="+fN(v.A0)+", k="+fN(v.k)+", t="+fN(v.t) }),
            "A0": v=>({ val:v.At*Math.exp(v.k*v.t),               rearr:"[A]₀ = [A]t × e^(kt)",     sub:"[A]t="+fN(v.At)+", k="+fN(v.k)+", t="+fN(v.t) }),
            "t":  v=>({ val:Math.log(v.A0/v.At)/v.k,              rearr:"t = ln([A]₀/[A]t) / k",   sub:"[A]₀="+fN(v.A0)+", [A]t="+fN(v.At)+", k="+fN(v.k) }),
            "k":  v=>({ val:Math.log(v.A0/v.At)/v.t,              rearr:"k = ln([A]₀/[A]t) / t",   sub:"[A]₀="+fN(v.A0)+", [A]t="+fN(v.At)+", t="+fN(v.t) })
          }
        },

        // ── Half-Life (First Order) ───────────────────────────────
        {
          id:"half_life", name:"Half-Life — First Order",
          formula:"t_half = ln(2) / k = 0.693 / k",
          desc:"Time for concentration to decrease by half. Only for first-order reactions.",
          ref:"CH101 Ref p.4",
          vars:{
            "t12": { sym:"t½",  desc:"Half-life",              units:["s","min","hr"], toBase:[1, 60, 3600] },
            "k":   { sym:"k",   desc:"First-order rate constant", units:["1/s","1/min","1/hr"], toBase:[1, 0.01667, 0.000278] }
          },
          solvers:{
            "t12": v=>({ val:Math.LN2/v.k,    rearr:"t½ = ln(2)/k = 0.693/k",   sub:"k="+fN(v.k) }),
            "k":   v=>({ val:Math.LN2/v.t12,  rearr:"k = ln(2)/t½ = 0.693/t½",  sub:"t½="+fN(v.t12) })
          }
        },

        // ── Second-Order Integrated Rate Law ─────────────────────
        {
          id:"second_order", name:"Second-Order Integrated Rate Law",
          formula:"1/[A]t = k*t + 1/[A]0",
          desc:"For second-order reactions in A. Half-life: t½ = 1/(k[A]₀).",
          ref:"CH101 Ref p.4",
          vars:{
            "At": { sym:"[A]t", desc:"Concentration at time t",   units:["mol/L"], toBase:[1] },
            "A0": { sym:"[A]₀", desc:"Initial concentration",     units:["mol/L"], toBase:[1] },
            "k":  { sym:"k",    desc:"Second-order rate constant", units:["L/(mol·s)"], toBase:[1] },
            "t":  { sym:"t",    desc:"Time",                      units:["s","min"],    toBase:[1, 60] }
          },
          solvers:{
            "At": v=>({ val:1/(v.k*v.t+1/v.A0),          rearr:"[A]t = 1/(kt + 1/[A]₀)",   sub:"[A]₀="+fN(v.A0)+", k="+fN(v.k)+", t="+fN(v.t) }),
            "t":  v=>({ val:(1/v.At-1/v.A0)/v.k,         rearr:"t = (1/[A]t − 1/[A]₀)/k",  sub:"[A]t="+fN(v.At)+", [A]₀="+fN(v.A0)+", k="+fN(v.k) }),
            "k":  v=>({ val:(1/v.At-1/v.A0)/v.t,         rearr:"k = (1/[A]t − 1/[A]₀)/t",  sub:"[A]t="+fN(v.At)+", [A]₀="+fN(v.A0)+", t="+fN(v.t) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 5 — ACIDS, BASES & ELECTROCHEMISTRY
    // pH, pOH, Ka, Kb, Henderson-Hasselbalch, Nernst
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "acids_electrochem",
      title: "Acids, Bases & Electrochemistry",
      desc:  "pH, pOH, Ka, Kb, Kw, Henderson-Hasselbalch, Nernst equation, ΔG = −nFE",
      equations: [

        // ── pH and pOH ────────────────────────────────────────────
        {
          id:"pH", name:"pH and pOH",
          formula:"pH = -log[H3O+],  pOH = -log[OH-],  pH + pOH = 14",
          desc:"At 25°C: Kw = [H₃O⁺][OH⁻] = 1.0×10⁻¹⁴. pH + pOH = 14.00.",
          ref:"CH101 Ref p.3",
          vars:{
            "pH":  { sym:"pH",   desc:"pH",                  units:["dimensionless"], toBase:[1] },
            "H3O": { sym:"[H₃O⁺]", desc:"Hydronium concentration", units:["mol/L"],  toBase:[1] }
          },
          solvers:{
            "pH":  v=>({ val:-Math.log10(v.H3O),              rearr:"pH = −log[H₃O⁺]",    sub:"[H₃O⁺]="+fN(v.H3O) }),
            "H3O": v=>({ val:Math.pow(10,-v.pH),              rearr:"[H₃O⁺] = 10^(−pH)",  sub:"pH="+fN(v.pH) })
          }
        },

        // ── pOH ──────────────────────────────────────────────────
        {
          id:"pOH", name:"pOH",
          formula:"pOH = -log[OH-]",
          desc:"pOH from hydroxide concentration. At 25°C: pH + pOH = 14.00.",
          ref:"CH101 Ref p.3",
          vars:{
            "pOH": { sym:"pOH",  desc:"pOH",                  units:["dimensionless"], toBase:[1] },
            "OH":  { sym:"[OH⁻]", desc:"Hydroxide concentration", units:["mol/L"],     toBase:[1] }
          },
          solvers:{
            "pOH": v=>({ val:-Math.log10(v.OH),               rearr:"pOH = −log[OH⁻]",    sub:"[OH⁻]="+fN(v.OH) }),
            "OH":  v=>({ val:Math.pow(10,-v.pOH),             rearr:"[OH⁻] = 10^(−pOH)",  sub:"pOH="+fN(v.pOH) })
          }
        },

        // ── pH + pOH = 14 ─────────────────────────────────────────
        {
          id:"ph_poh", name:"pH + pOH = 14.00 (at 25°C)",
          formula:"pH + pOH = 14.00",
          desc:"Relationship between pH and pOH at 25°C. Kw = 1.0×10⁻¹⁴.",
          ref:"CH101 Ref p.3",
          vars:{
            "pH":  { sym:"pH",  desc:"pH",   units:["dimensionless"], toBase:[1] },
            "pOH": { sym:"pOH", desc:"pOH",  units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "pH":  v=>({ val:14-v.pOH,   rearr:"pH = 14 − pOH",   sub:"pOH="+fN(v.pOH) }),
            "pOH": v=>({ val:14-v.pH,    rearr:"pOH = 14 − pH",   sub:"pH="+fN(v.pH) })
          }
        },

        // ── Henderson-Hasselbalch ─────────────────────────────────
        {
          id:"hh", name:"Henderson-Hasselbalch Equation",
          formula:"pH = pKa + log([base] / [acid])",
          desc:"pH of a buffer solution. pKa = −log(Ka). Applies when [HA] and [A⁻] are both significant.",
          ref:"CH101 Ref p.3",
          vars:{
            "pH":  { sym:"pH",  desc:"Buffer pH",              units:["dimensionless"], toBase:[1] },
            "pKa": { sym:"pKa", desc:"−log(Ka)",               units:["dimensionless"], toBase:[1] },
            "B":   { sym:"[A⁻]",desc:"Concentration of base form (conjugate base)", units:["mol/L"], toBase:[1] },
            "A":   { sym:"[HA]",desc:"Concentration of acid form",                   units:["mol/L"], toBase:[1] }
          },
          solvers:{
            "pH":  v=>({ val:v.pKa+Math.log10(v.B/v.A),      rearr:"pH = pKa + log([A⁻]/[HA])",   sub:"pKa="+fN(v.pKa)+", [A⁻]="+fN(v.B)+", [HA]="+fN(v.A) }),
            "pKa": v=>({ val:v.pH-Math.log10(v.B/v.A),       rearr:"pKa = pH − log([A⁻]/[HA])",   sub:"pH="+fN(v.pH)+", [A⁻]="+fN(v.B)+", [HA]="+fN(v.A) }),
            "B":   v=>({ val:v.A*Math.pow(10,v.pH-v.pKa),    rearr:"[A⁻] = [HA]×10^(pH−pKa)",    sub:"pH="+fN(v.pH)+", pKa="+fN(v.pKa)+", [HA]="+fN(v.A) }),
            "A":   v=>({ val:v.B/Math.pow(10,v.pH-v.pKa),    rearr:"[HA] = [A⁻]/10^(pH−pKa)",    sub:"pH="+fN(v.pH)+", pKa="+fN(v.pKa)+", [A⁻]="+fN(v.B) })
          }
        },

        // ── Nernst Equation ───────────────────────────────────────
        {
          id:"nernst", name:"Nernst Equation",
          formula:"E = E° - (RT/nF) * ln(Q) = E° - (0.05916/n) * log(Q)  at 298K",
          desc:"Cell potential under non-standard conditions. F = 96485 C/mol, R = 8.314 J/(mol·K). At 298 K: E = E° − (0.05916/n)×log Q.",
          ref:"CH101 Ref p.3",
          vars:{
            "E":   { sym:"E",   desc:"Cell potential",          units:["V"],              toBase:[1] },
            "E0":  { sym:"E°",  desc:"Standard cell potential", units:["V"],              toBase:[1] },
            "n":   { sym:"n",   desc:"Moles of electrons transferred", units:["mol"],    toBase:[1] },
            "Q":   { sym:"Q",   desc:"Reaction quotient",       units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "E":   v=>({ val:v.E0 - 0.05916/v.n*Math.log10(v.Q),    rearr:"E = E° − (0.05916/n)×log Q  [298K]",   sub:"E°="+fN(v.E0)+", n="+fN(v.n)+", Q="+fN(v.Q) }),
            "E0":  v=>({ val:v.E + 0.05916/v.n*Math.log10(v.Q),     rearr:"E° = E + (0.05916/n)×log Q  [298K]",  sub:"E="+fN(v.E)+", n="+fN(v.n)+", Q="+fN(v.Q) }),
            "Q":   v=>({ val:Math.pow(10,(v.E0-v.E)*v.n/0.05916),    rearr:"Q = 10^[(E°−E)×n/0.05916]  [298K]",  sub:"E°="+fN(v.E0)+", E="+fN(v.E)+", n="+fN(v.n) }),
            "n":   v=>({ val:0.05916*Math.log10(v.Q)/(v.E0-v.E),     rearr:"n = 0.05916×log Q / (E°−E)  [298K]", sub:"E°="+fN(v.E0)+", E="+fN(v.E)+", Q="+fN(v.Q) })
          }
        },

        // ── ΔG and Cell Potential ─────────────────────────────────
        {
          id:"dG_cell", name:"ΔG and Cell Potential",
          formula:"delta_G = -n * F * E°",
          desc:"ΔG° = −nFE°. F = Faraday's constant = 96485 C/mol. Positive E° means spontaneous.",
          ref:"CH101 Ref p.3",
          vars:{
            "dG": { sym:"ΔG°",  desc:"Standard free energy",   units:["J/mol","kJ/mol"], toBase:[1, 1000] },
            "n":  { sym:"n",    desc:"Moles of electrons",     units:["mol"],             toBase:[1] },
            "F":  { sym:"F",    desc:"Faraday's constant (96485 C/mol)", units:["C/mol"], toBase:[1] },
            "E0": { sym:"E°",   desc:"Standard cell potential", units:["V"],              toBase:[1] }
          },
          solvers:{
            "dG": v=>({ val:-v.n*v.F*v.E0,       rearr:"ΔG° = −nFE°",      sub:"n="+fN(v.n)+", F="+fN(v.F)+", E°="+fN(v.E0) }),
            "E0": v=>({ val:-v.dG/(v.n*v.F),     rearr:"E° = −ΔG°/(nF)",   sub:"ΔG°="+fN(v.dG)+", n="+fN(v.n)+", F="+fN(v.F) }),
            "n":  v=>({ val:-v.dG/(v.F*v.E0),    rearr:"n = −ΔG°/(FE°)",   sub:"ΔG°="+fN(v.dG)+", F="+fN(v.F)+", E°="+fN(v.E0) })
          }
        },

        // ── E°cell from half-cells ────────────────────────────────
        {
          id:"ecell", name:"Standard Cell Potential",
          formula:"E°cell = E°cathode - E°anode",
          desc:"E°cell = E°reduction(cathode) − E°reduction(anode). See reference tab for half-cell potentials.",
          ref:"CH101 Ref p.9",
          vars:{
            "Ecell":  { sym:"E°cell",   desc:"Standard cell potential",    units:["V"], toBase:[1] },
            "Ecath":  { sym:"E°cathode",desc:"Cathode reduction potential", units:["V"], toBase:[1] },
            "Eanode": { sym:"E°anode",  desc:"Anode reduction potential",   units:["V"], toBase:[1] }
          },
          solvers:{
            "Ecell":  v=>({ val:v.Ecath-v.Eanode,    rearr:"E°cell = E°cathode − E°anode",   sub:"E°cath="+fN(v.Ecath)+", E°anode="+fN(v.Eanode) }),
            "Ecath":  v=>({ val:v.Ecell+v.Eanode,    rearr:"E°cathode = E°cell + E°anode",   sub:"E°cell="+fN(v.Ecell)+", E°anode="+fN(v.Eanode) }),
            "Eanode": v=>({ val:v.Ecath-v.Ecell,     rearr:"E°anode = E°cathode − E°cell",   sub:"E°cath="+fN(v.Ecath)+", E°cell="+fN(v.Ecell) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 6 — REFERENCE DATA
    // Read-only info tab: solubility rules, Ka/Kb, Ksp, specific
    // heats, electrode potentials, bond energies — displayed as
    // formatted reference cards (no solvers needed)
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "reference",
      title: "Reference Data",
      desc:  "Solubility rules, common Ka/Kb values, Ksp table, specific heat capacities, standard electrode potentials — look-up reference",
      equations: [

        // ── Solubility Rules ──────────────────────────────────────
        {
          id:"solubility_rules", name:"Solubility Rules — Ionic Compounds in Water",
          formula:"See rules below",
          desc:"SOLUBLE: All Group 1A & NH₄⁺ compounds. All nitrates (NO₃⁻), acetates (CH₃COO⁻). Most chlorides (Cl⁻), bromides (Br⁻), iodides (I⁻) — EXCEPT Ag⁺, Pb²⁺, Hg₂²⁺. Most sulfates (SO₄²⁻) — EXCEPT BaSO₄, SrSO₄, PbSO₄, CaSO₄, Ag₂SO₄.\n\nINSOLUBLE: Most carbonates (CO₃²⁻), chromates (CrO₄²⁻), phosphates (PO₄³⁻), sulfides (S²⁻) — EXCEPT Group 1A and NH₄⁺. Most hydroxides (OH⁻) — EXCEPT Group 1A, Ba(OH)₂, Sr(OH)₂, Ca(OH)₂.",
          ref:"CH101 Ref p.1",
          vars:{},
          solvers:{}
        },

        // ── Strong/Weak Acids and Bases ───────────────────────────
        {
          id:"strong_weak", name:"Strong and Weak Acids & Bases",
          formula:"Memorize these",
          desc:"STRONG ACIDS: HCl, HBr, HI, HNO₃, H₂SO₄, HClO₄.\nWEAK ACIDS (examples): HF, CH₃COOH (acetic), H₃PO₄, HNO₂, HClO.\n\nSTRONG BASES (Group 1A hydroxides): LiOH, NaOH, KOH, RbOH, CsOH. Heavy Group 2A: Ca(OH)₂, Sr(OH)₂, Ba(OH)₂.\nWEAK BASES (examples): NH₃ (ammonia).",
          ref:"CH101 Ref p.5",
          vars:{},
          solvers:{}
        },

        // ── Common Ka Values ──────────────────────────────────────
        {
          id:"Ka_table", name:"Common Ka Values (at 25°C)",
          formula:"Ka = [H⁺][A⁻] / [HA]",
          desc:"Selected weak acid Ka values:\nHF: Ka = 6.8×10⁻⁴\nHNO₂: Ka = 4.5×10⁻⁴\nCH₃COOH (acetic): Ka = 1.8×10⁻⁵\nH₂CO₃: Ka1 = 4.3×10⁻⁷, Ka2 = 4.7×10⁻¹¹\nH₂S: Ka1 = 9.5×10⁻⁸\nHCN: Ka = 6.2×10⁻¹⁰\nNH₄⁺: Ka = 5.6×10⁻¹⁰\nHCO₃⁻: Ka = 4.7×10⁻¹¹\n\npKa = −log(Ka)   Ka = 10^(−pKa)",
          ref:"CH101 Ref p.4/13",
          vars:{
            "Ka":  { sym:"Ka",  desc:"Acid dissociation constant", units:["dimensionless"], toBase:[1] },
            "pKa": { sym:"pKa", desc:"−log(Ka)",                   units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "pKa": v=>({ val:-Math.log10(v.Ka),     rearr:"pKa = −log(Ka)",    sub:"Ka="+fN(v.Ka) }),
            "Ka":  v=>({ val:Math.pow(10,-v.pKa),   rearr:"Ka = 10^(−pKa)",   sub:"pKa="+fN(v.pKa) })
          }
        },

        // ── Common Kb Values ──────────────────────────────────────
        {
          id:"Kb_table", name:"Kb and Kw Relationship",
          formula:"Ka × Kb = Kw = 1.0×10^-14  (at 25°C)",
          desc:"For a conjugate acid-base pair: Ka × Kb = Kw = 1.0×10⁻¹⁴ at 25°C.\nNH₃: Kb = 1.8×10⁻⁵\nC₅H₅N (pyridine): Kb = 1.7×10⁻⁹\npKb = −log(Kb)   pKa + pKb = 14",
          ref:"CH101 Ref p.3",
          vars:{
            "Ka":  { sym:"Ka",  desc:"Acid dissociation constant",  units:["dimensionless"], toBase:[1] },
            "Kb":  { sym:"Kb",  desc:"Base dissociation constant",  units:["dimensionless"], toBase:[1] },
            "Kw":  { sym:"Kw",  desc:"Water autoionization constant (1e-14)", units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "Ka":  v=>({ val:v.Kw/v.Kb,   rearr:"Ka = Kw / Kb",   sub:"Kw="+fN(v.Kw)+", Kb="+fN(v.Kb) }),
            "Kb":  v=>({ val:v.Kw/v.Ka,   rearr:"Kb = Kw / Ka",   sub:"Kw="+fN(v.Kw)+", Ka="+fN(v.Ka) }),
            "Kw":  v=>({ val:v.Ka*v.Kb,   rearr:"Kw = Ka × Kb",   sub:"Ka="+fN(v.Ka)+", Kb="+fN(v.Kb) })
          }
        },

        // ── Specific Heat Capacities ──────────────────────────────
        {
          id:"specific_heat", name:"Specific Heat Capacities (at 298 K)",
          formula:"q = m × c × ΔT",
          desc:"Common specific heat values c (J/g·K):\nWater, H₂O(l): 4.18\nEthyl alcohol, C₂H₅OH(l): 2.438\nEthylene glycol, (CH₂OH)₂(l): 2.394\nCarbon tetrachloride, CCl₄(l): 0.857\n\nElements:\nAluminum, Al: 0.897\nGraphite, C: 0.709\nIron, Fe: 0.449\nCopper, Cu: 0.385\nGold, Au: 0.129\n\nMaterials:\nWood: 1.76\nCement: 0.88\nGlass: 0.80\nGranite: 0.79\nSteel: 0.45",
          ref:"CH101 Ref p.8",
          vars:{},
          solvers:{}
        },

        // ── Selected Standard Electrode Potentials ────────────────
        {
          id:"electrode", name:"Selected Standard Electrode Potentials E° (V)",
          formula:"E°cell = E°cathode − E°anode",
          desc:"Half-reactions written as reductions (high to low E°):\nF₂ + 2e⁻ → 2F⁻: +2.866 V\nCl₂ + 2e⁻ → 2Cl⁻: +1.358 V\nO₂ + 4H⁺ + 4e⁻ → 2H₂O: +1.229 V\nAg⁺ + e⁻ → Ag: +0.800 V\nCu²⁺ + 2e⁻ → Cu: +0.342 V\n2H⁺ + 2e⁻ → H₂: 0.000 V (reference)\nFe²⁺ + 2e⁻ → Fe: −0.440 V\nZn²⁺ + 2e⁻ → Zn: −0.763 V\nAl³⁺ + 3e⁻ → Al: −1.676 V\nMg²⁺ + 2e⁻ → Mg: −2.372 V\nNa⁺ + e⁻ → Na: −2.713 V\nLi⁺ + e⁻ → Li: −3.040 V\n\nSee CH101 reference card p.9 for full table.",
          ref:"CH101 Ref p.9",
          vars:{},
          solvers:{}
        }
      ]
    }

  ]
};