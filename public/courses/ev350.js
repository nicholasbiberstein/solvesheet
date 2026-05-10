// ================================================================
// EV350 — Environmental Engineering
// Complete equation set from EV350 Useful Equations Sheet (23 Apr 2026)
// Every equation is fully algebraic — all variables solvable.
// To update: edit ONLY this file, then push to GitHub.
// ================================================================

window.COURSE_EV350 = {
  id:          "ev350",
  code:        "EV350",
  name:        "Environmental Engineering",
  description: "Mass balance, water treatment, wastewater, air quality",

  tabs: [

    // ═══════════════════════════════════════════════════════════════
    // TAB 1 — EV FUNDAMENTALS
    // Mass Balance, Environmental Chemistry, Chemical Feed
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "fundamentals",
      title: "EV Fundamentals",
      desc:  "Mass balance, first-order decay, environmental chemistry",
      equations: [

        // ── dM/dt full mass balance ──────────────────────────────
        {
          id:"dMdt", name:"Full Mass Balance (Accumulation Rate)",
          formula:"dM/dt = SUM(Qin*Cin) - SUM(Qout*Cout) + S ± r*V",
          desc:"General mass balance. r = k*Cmix for 1st order reactions. At steady state dM/dt = 0. (EQN 2-3 modified)",
          ref:"EQN 2-3",
          vars:{
            "dMdt":{ sym:"dM/dt",    desc:"Accumulation rate",            units:["mg/d","g/d","kg/d"],     toBase:[1,1000,1e6] },
            "QinCin":{ sym:"QinCin", desc:"Sum of all (Qin x Cin) terms", units:["mg/d","g/d","kg/d"],     toBase:[1,1000,1e6] },
            "QoutCout":{ sym:"QoutCout",desc:"Sum of all (Qout x Cout) terms",units:["mg/d","g/d","kg/d"], toBase:[1,1000,1e6] },
            "S":   { sym:"S",        desc:"Source term (mass/time)",       units:["mg/d","g/d","kg/d"],     toBase:[1,1000,1e6] },
            "rV":  { sym:"r*V",      desc:"Transformation term (r*V)",     units:["mg/d","g/d","kg/d"],     toBase:[1,1000,1e6] }
          },
          solvers:{
            "dMdt":    v=>({ val:v.QinCin-v.QoutCout+v.S+v.rV,    rearr:"dM/dt = QinCin - QoutCout + S + r*V",   sub:"QinCin="+fN(v.QinCin)+", QoutCout="+fN(v.QoutCout)+", S="+fN(v.S)+", rV="+fN(v.rV) }),
            "QinCin":  v=>({ val:v.dMdt+v.QoutCout-v.S-v.rV,     rearr:"QinCin = dM/dt + QoutCout - S - r*V",   sub:"dM/dt="+fN(v.dMdt)+", QoutCout="+fN(v.QoutCout)+", S="+fN(v.S)+", rV="+fN(v.rV) }),
            "QoutCout":v=>({ val:v.QinCin-v.dMdt+v.S+v.rV,       rearr:"QoutCout = QinCin - dM/dt + S + r*V",   sub:"QinCin="+fN(v.QinCin)+", dM/dt="+fN(v.dMdt)+", S="+fN(v.S)+", rV="+fN(v.rV) }),
            "S":       v=>({ val:v.dMdt-v.QinCin+v.QoutCout-v.rV, rearr:"S = dM/dt - QinCin + QoutCout - r*V",  sub:"dM/dt="+fN(v.dMdt)+", QinCin="+fN(v.QinCin)+", QoutCout="+fN(v.QoutCout)+", rV="+fN(v.rV) }),
            "rV":      v=>({ val:v.dMdt-v.QinCin+v.QoutCout-v.S,  rearr:"r*V = dM/dt - QinCin + QoutCout - S",  sub:"dM/dt="+fN(v.dMdt)+", QinCin="+fN(v.QinCin)+", QoutCout="+fN(v.QoutCout)+", S="+fN(v.S) })
          }
        },

        // ── dC/dt first order reaction rate ─────────────────────
        {
          id:"dcdt", name:"First-Order Reaction Rate",
          formula:"dC/dt = -k * C",
          desc:"Rate of concentration change for first-order reaction. (EQN 2-12)",
          ref:"EQN 2-12",
          vars:{
            "dcdt":{ sym:"dC/dt", desc:"Rate of concentration change", units:["mg/L/d","mg/L/h"], toBase:[1,24] },
            "k":   { sym:"k",     desc:"First-order rate constant",     units:["1/d","1/h"],       toBase:[1,24] },
            "C":   { sym:"C",     desc:"Current concentration",         units:["mg/L","ug/L"],     toBase:[1,0.001] }
          },
          solvers:{
            "dcdt": v=>({ val:-v.k*v.C,       rearr:"dC/dt = -k * C",       sub:"k="+fN(v.k)+"1/d, C="+fN(v.C)+"mg/L" }),
            "k":    v=>({ val:-v.dcdt/v.C,     rearr:"k = -(dC/dt) / C",     sub:"dC/dt="+fN(v.dcdt)+", C="+fN(v.C) }),
            "C":    v=>({ val:-v.dcdt/v.k,     rearr:"C = -(dC/dt) / k",     sub:"dC/dt="+fN(v.dcdt)+", k="+fN(v.k) })
          }
        },

        // ── HRT ─────────────────────────────────────────────────
        {
          id:"hrt", name:"Hydraulic Retention Time",
          formula:"tau = V / Q",
          desc:"Time fluid spends in a reactor. Core sizing parameter. (EQN 2-27)",
          ref:"EQN 2-27",
          vars:{
            "tau":{ sym:"tau", desc:"Hydraulic retention time", units:["d","h","s"],               toBase:[1,1/24,1/86400] },
            "V":  { sym:"V",   desc:"Reactor / tank volume",    units:["m3","L","gal","ft3"],      toBase:[1,0.001,0.003785,0.028317] },
            "Q":  { sym:"Q",   desc:"Flow rate",                units:["m3/s","m3/d","L/s","MGD"],toBase:[1,1/86400,0.001,0.04381] }
          },
          solvers:{
            "tau": v=>({ val:v.V/v.Q/86400,     rearr:"tau [d] = V / (Q x 86400)",  sub:"V="+fN(v.V)+"m3, Q="+fN(v.Q)+"m3/s" }),
            "V":   v=>({ val:v.tau*86400*v.Q,   rearr:"V = tau x Q x 86400",        sub:"tau="+fN(v.tau)+"d, Q="+fN(v.Q)+"m3/s" }),
            "Q":   v=>({ val:v.V/(v.tau*86400), rearr:"Q = V / (tau x 86400)",      sub:"V="+fN(v.V)+"m3, tau="+fN(v.tau)+"d" })
          }
        },

        // ── First-order decay ────────────────────────────────────
        {
          id:"decay", name:"First-Order Decay — C(t)",
          formula:"C_t = C_o x exp(-k x t)",
          desc:"Concentration at time t under first-order decay. (EQN 2-14)",
          ref:"EQN 2-14",
          vars:{
            "C0":{ sym:"C_o", desc:"Initial concentration",    units:["mg/L","ug/L","g/m3"], toBase:[1,0.001,1] },
            "k": { sym:"k",   desc:"First-order rate constant", units:["1/d","1/h"],          toBase:[1,24] },
            "t": { sym:"t",   desc:"Time",                      units:["d","h","s"],           toBase:[1,1/24,1/86400] },
            "Ct":{ sym:"C_t", desc:"Concentration at time t",   units:["mg/L","ug/L","g/m3"], toBase:[1,0.001,1] }
          },
          solvers:{
            "Ct": v=>({ val:v.C0*Math.exp(-v.k*v.t),       rearr:"C_t = C_o x e^(-k x t)",   sub:"C_o="+fN(v.C0)+", k="+fN(v.k)+", t="+fN(v.t) }),
            "C0": v=>({ val:v.Ct/Math.exp(-v.k*v.t),       rearr:"C_o = C_t / e^(-k x t)",   sub:"C_t="+fN(v.Ct)+", k="+fN(v.k)+", t="+fN(v.t) }),
            "k":  v=>({ val:-Math.log(v.Ct/v.C0)/v.t,      rearr:"k = -ln(C_t/C_o) / t",     sub:"C_t="+fN(v.Ct)+", C_o="+fN(v.C0)+", t="+fN(v.t) }),
            "t":  v=>({ val:-Math.log(v.Ct/v.C0)/v.k,      rearr:"t = -ln(C_t/C_o) / k",     sub:"C_t="+fN(v.Ct)+", C_o="+fN(v.C0)+", k="+fN(v.k) })
          }
        },

        // ── Steady-state CSTR ────────────────────────────────────
        {
          id:"cstr_ss", name:"Steady-State CSTR (Conservative)",
          formula:"Q_in x C_in = Q_out x C_out",
          desc:"Mass balance at steady state — no reaction, completely mixed. (EQN 2-3)",
          ref:"EQN 2-3",
          vars:{
            "Qin": { sym:"Q_in",  desc:"Influent flow rate",     units:["m3/s","L/s","m3/d","MGD"],toBase:[1,0.001,1/86400,0.04381] },
            "Cin": { sym:"C_in",  desc:"Influent concentration", units:["mg/L","ug/L","g/m3"],      toBase:[1,0.001,1] },
            "Qout":{ sym:"Q_out", desc:"Effluent flow rate",     units:["m3/s","L/s","m3/d","MGD"],toBase:[1,0.001,1/86400,0.04381] },
            "Cout":{ sym:"C_out", desc:"Effluent concentration", units:["mg/L","ug/L","g/m3"],      toBase:[1,0.001,1] }
          },
          solvers:{
            "Cout": v=>({ val:v.Qin*v.Cin/v.Qout,  rearr:"C_out = (Q_in x C_in) / Q_out", sub:"Q_in="+fN(v.Qin)+", C_in="+fN(v.Cin)+", Q_out="+fN(v.Qout) }),
            "Cin":  v=>({ val:v.Qout*v.Cout/v.Qin, rearr:"C_in = (Q_out x C_out) / Q_in", sub:"Q_out="+fN(v.Qout)+", C_out="+fN(v.Cout)+", Q_in="+fN(v.Qin) }),
            "Qin":  v=>({ val:v.Qout*v.Cout/v.Cin, rearr:"Q_in = (Q_out x C_out) / C_in", sub:"Q_out="+fN(v.Qout)+", C_out="+fN(v.Cout)+", C_in="+fN(v.Cin) }),
            "Qout": v=>({ val:v.Qin*v.Cin/v.Cout,  rearr:"Q_out = (Q_in x C_in) / C_out", sub:"Q_in="+fN(v.Qin)+", C_in="+fN(v.Cin)+", C_out="+fN(v.Cout) })
          }
        },

        // ── Two stream mixing ────────────────────────────────────
        {
          id:"mixing", name:"Two-Stream Mixing",
          formula:"Q1 x C1 + Q2 x C2 = Q_mix x C_mix",
          desc:"Steady-state mixing of two influent streams. (EQN 2-3)",
          ref:"EQN 2-3",
          vars:{
            "Q1":{ sym:"Q1",    desc:"Flow rate stream 1",     units:["m3/s","L/s","m3/d"],toBase:[1,0.001,1/86400] },
            "C1":{ sym:"C1",    desc:"Concentration stream 1", units:["mg/L","ug/L"],       toBase:[1,0.001] },
            "Q2":{ sym:"Q2",    desc:"Flow rate stream 2",     units:["m3/s","L/s","m3/d"],toBase:[1,0.001,1/86400] },
            "C2":{ sym:"C2",    desc:"Concentration stream 2", units:["mg/L","ug/L"],       toBase:[1,0.001] },
            "Qm":{ sym:"Q_mix", desc:"Mixed flow rate",        units:["m3/s","L/s","m3/d"],toBase:[1,0.001,1/86400] },
            "Cm":{ sym:"C_mix", desc:"Mixed concentration",    units:["mg/L","ug/L"],       toBase:[1,0.001] }
          },
          solvers:{
            "Cm": v=>({ val:(v.Q1*v.C1+v.Q2*v.C2)/v.Qm,   rearr:"C_mix = (Q1*C1 + Q2*C2) / Q_mix",  sub:"Q1="+fN(v.Q1)+", C1="+fN(v.C1)+", Q2="+fN(v.Q2)+", C2="+fN(v.C2) }),
            "Qm": v=>({ val:(v.Q1*v.C1+v.Q2*v.C2)/v.Cm,   rearr:"Q_mix = (Q1*C1 + Q2*C2) / C_mix",  sub:"Q1="+fN(v.Q1)+", C1="+fN(v.C1)+", Q2="+fN(v.Q2)+", C2="+fN(v.C2) }),
            "C1": v=>({ val:(v.Qm*v.Cm-v.Q2*v.C2)/v.Q1,   rearr:"C1 = (Q_mix*C_mix - Q2*C2) / Q1",  sub:"Q_mix="+fN(v.Qm)+", C_mix="+fN(v.Cm)+", Q2="+fN(v.Q2)+", C2="+fN(v.C2) }),
            "C2": v=>({ val:(v.Qm*v.Cm-v.Q1*v.C1)/v.Q2,   rearr:"C2 = (Q_mix*C_mix - Q1*C1) / Q2",  sub:"Q_mix="+fN(v.Qm)+", C_mix="+fN(v.Cm)+", Q1="+fN(v.Q1)+", C1="+fN(v.C1) }),
            "Q1": v=>({ val:(v.Qm*v.Cm-v.Q2*v.C2)/v.C1,   rearr:"Q1 = (Q_mix*C_mix - Q2*C2) / C1",  sub:"Q_mix="+fN(v.Qm)+", C_mix="+fN(v.Cm)+", Q2="+fN(v.Q2)+", C2="+fN(v.C2) }),
            "Q2": v=>({ val:(v.Qm*v.Cm-v.Q1*v.C1)/v.C2,   rearr:"Q2 = (Q_mix*C_mix - Q1*C1) / C2",  sub:"Q_mix="+fN(v.Qm)+", C_mix="+fN(v.Cm)+", Q1="+fN(v.Q1)+", C1="+fN(v.C1) })
          }
        },

        // ── Solubility product ───────────────────────────────────
        {
          id:"ksp", name:"Solubility Product (Ksp)",
          formula:"Ks = [A]^a * [B]^b",
          desc:"Solubility product expression for AaBb(s) <=> aA^b+ + bB^a-. (EQN 5-23/5-21)",
          ref:"EQN 5-23/5-21",
          vars:{
            "Ks":{ sym:"Ks",   desc:"Solubility product constant", units:["dimensionless"], toBase:[1] },
            "A": { sym:"[A]",  desc:"Concentration of ion A",      units:["mol/L"],         toBase:[1] },
            "B": { sym:"[B]",  desc:"Concentration of ion B",      units:["mol/L"],         toBase:[1] },
            "a": { sym:"a",    desc:"Stoichiometric coefficient a", units:["dimensionless"], toBase:[1] },
            "b": { sym:"b",    desc:"Stoichiometric coefficient b", units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "Ks": v=>({ val:Math.pow(v.A,v.a)*Math.pow(v.B,v.b),                          rearr:"Ks = [A]^a * [B]^b",                     sub:"[A]="+fN(v.A)+", [B]="+fN(v.B)+", a="+fN(v.a)+", b="+fN(v.b) }),
            "A":  v=>({ val:Math.pow(v.Ks/Math.pow(v.B,v.b),1/v.a),                       rearr:"[A] = (Ks / [B]^b)^(1/a)",              sub:"Ks="+fN(v.Ks)+", [B]="+fN(v.B)+", b="+fN(v.b)+", a="+fN(v.a) }),
            "B":  v=>({ val:Math.pow(v.Ks/Math.pow(v.A,v.a),1/v.b),                       rearr:"[B] = (Ks / [A]^a)^(1/b)",              sub:"Ks="+fN(v.Ks)+", [A]="+fN(v.A)+", a="+fN(v.a)+", b="+fN(v.b) })
          }
        },

        // ── pH and H+ ────────────────────────────────────────────
        {
          id:"ph_h", name:"pH and [H+]",
          formula:"pH = -log10([H+])",
          desc:"Relationship between pH and hydrogen ion concentration. (EQN 5-31)",
          ref:"EQN 5-31",
          vars:{
            "pH":{ sym:"pH",   desc:"pH (dimensionless)", units:["dimensionless"], toBase:[1] },
            "Hp":{ sym:"[H+]", desc:"H+ concentration",  units:["mol/L"],         toBase:[1] }
          },
          solvers:{
            "pH": v=>({ val:-Math.log10(v.Hp),  rearr:"pH = -log10([H+])", sub:"[H+]="+fN(v.Hp)+"mol/L" }),
            "Hp": v=>({ val:Math.pow(10,-v.pH), rearr:"[H+] = 10^(-pH)",   sub:"pH="+fN(v.pH) })
          }
        },

        // ── OH- from pH ──────────────────────────────────────────
        {
          id:"oh_ph", name:"[OH-] from pH",
          formula:"[OH-] = 10^(-(14-pH))",
          desc:"Hydroxide ion concentration at a given pH. (EQN 5-30)",
          ref:"EQN 5-30",
          vars:{
            "pH": { sym:"pH",    desc:"pH (dimensionless)",      units:["dimensionless"], toBase:[1] },
            "OHm":{ sym:"[OH-]", desc:"Hydroxide concentration", units:["mol/L"],         toBase:[1] }
          },
          solvers:{
            "OHm": v=>({ val:Math.pow(10,-(14-v.pH)), rearr:"[OH-] = 10^(-(14-pH))", sub:"pH="+fN(v.pH) }),
            "pH":  v=>({ val:14+Math.log10(v.OHm),    rearr:"pH = 14 + log10([OH-])",sub:"[OH-]="+fN(v.OHm) })
          }
        },

        // ── Kw ───────────────────────────────────────────────────
        {
          id:"kw", name:"Water Dissociation Constant (Kw)",
          formula:"Kw = [OH-] x [H+] = 1e-14",
          desc:"Ion product of water at 25C. Use to find [OH-] from [H+] or vice versa. (EQN 5-30)",
          ref:"EQN 5-30",
          vars:{
            "Hp": { sym:"[H+]",  desc:"H+ concentration",  units:["mol/L"], toBase:[1] },
            "OHm":{ sym:"[OH-]", desc:"OH- concentration", units:["mol/L"], toBase:[1] }
          },
          solvers:{
            "OHm": v=>({ val:1e-14/v.Hp,  rearr:"[OH-] = 1e-14 / [H+]", sub:"[H+]="+fN(v.Hp)+"mol/L" }),
            "Hp":  v=>({ val:1e-14/v.OHm, rearr:"[H+] = 1e-14 / [OH-]", sub:"[OH-]="+fN(v.OHm)+"mol/L" })
          }
        },

        // ── pKs ─────────────────────────────────────────────────
        {
          id:"pks", name:"pKs from Ks",
          formula:"pKs = -log10(Ks)",
          desc:"Converts solubility product to logarithmic form. (EQN 5-24)",
          ref:"EQN 5-24",
          vars:{
            "Ks": { sym:"Ks",  desc:"Solubility product constant", units:["dimensionless"], toBase:[1] },
            "pKs":{ sym:"pKs", desc:"Negative log of Ks",          units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "pKs": v=>({ val:-Math.log10(v.Ks),   rearr:"pKs = -log10(Ks)", sub:"Ks="+fN(v.Ks) }),
            "Ks":  v=>({ val:Math.pow(10,-v.pKs), rearr:"Ks = 10^(-pKs)",   sub:"pKs="+fN(v.pKs) })
          }
        },

        // ── Chemical feed rate ───────────────────────────────────
        {
          id:"chem_feed", name:"Chemical Feed Rate",
          formula:"Qc x C = Q x D",
          desc:"Required chemical feed flow to achieve a desired dose. (EQN 5-56)",
          ref:"EQN 5-56",
          vars:{
            "Qc":{ sym:"Qc", desc:"Chemical feed flow rate",      units:["m3/s","L/s","m3/d"],  toBase:[1,0.001,1/86400] },
            "Cc":{ sym:"C",  desc:"Chemical stock concentration", units:["mg/L","g/L","kg/m3"], toBase:[1,1000,1000] },
            "Q": { sym:"Q",  desc:"Treatment / design flow",      units:["m3/s","L/s","m3/d"],  toBase:[1,0.001,1/86400] },
            "D": { sym:"D",  desc:"Desired dose",                 units:["mg/L","g/L","kg/m3"], toBase:[1,1000,1000] }
          },
          solvers:{
            "Qc": v=>({ val:v.Q*v.D/v.Cc,  rearr:"Qc = (Q x D) / C", sub:"Q="+fN(v.Q)+", D="+fN(v.D)+", C="+fN(v.Cc) }),
            "Cc": v=>({ val:v.Q*v.D/v.Qc,  rearr:"C = (Q x D) / Qc", sub:"Q="+fN(v.Q)+", D="+fN(v.D)+", Qc="+fN(v.Qc) }),
            "Q":  v=>({ val:v.Qc*v.Cc/v.D, rearr:"Q = (Qc x C) / D", sub:"Qc="+fN(v.Qc)+", C="+fN(v.Cc)+", D="+fN(v.D) }),
            "D":  v=>({ val:v.Qc*v.Cc/v.Q, rearr:"D = (Qc x C) / Q", sub:"Qc="+fN(v.Qc)+", C="+fN(v.Cc)+", Q="+fN(v.Q) })
          }
        }

      ] // end fundamentals equations
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 2 — DRINKING WATER TREATMENT
    // Flocculation/Sedimentation, Filtration, Disinfection, Adsorption
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "drinking",
      title: "Drinking Water Treatment",
      desc:  "Flocculation, sedimentation, filtration, disinfection, adsorption",
      equations: [

        // ── Overflow rate ────────────────────────────────────────
        {
          id:"overflow", name:"Overflow / Surface Loading Rate",
          formula:"v_o = Q / A_s",
          desc:"Rate at which water rises in a sedimentation basin. (EQN 6-28)",
          ref:"EQN 6-28",
          vars:{
            "vo":{ sym:"v_o", desc:"Overflow rate",     units:["m/s","m/d","m/h"],   toBase:[1,1/86400,1/3600] },
            "Q": { sym:"Q",   desc:"Flow rate",          units:["m3/s","m3/d","L/s"],toBase:[1,1/86400,0.001] },
            "As":{ sym:"A_s", desc:"Basin surface area", units:["m2","ft2"],          toBase:[1,0.0929] }
          },
          solvers:{
            "vo": v=>({ val:v.Q/v.As,  rearr:"v_o = Q / A_s", sub:"Q="+fN(v.Q)+", A_s="+fN(v.As) }),
            "Q":  v=>({ val:v.vo*v.As, rearr:"Q = v_o x A_s", sub:"v_o="+fN(v.vo)+", A_s="+fN(v.As) }),
            "As": v=>({ val:v.Q/v.vo,  rearr:"A_s = Q / v_o", sub:"Q="+fN(v.Q)+", v_o="+fN(v.vo) })
          }
        },

        // ── WOR ─────────────────────────────────────────────────
        {
          id:"wor", name:"Weir Overflow Rate (WOR)",
          formula:"WOR = Q / WL",
          desc:"Flow per unit length of effluent weir. Design check for basins. (p.322)",
          ref:"p.322",
          vars:{
            "WOR":{ sym:"WOR", desc:"Weir overflow rate", units:["m2/s","m3/(m*d)"],  toBase:[1,1/86400] },
            "Q":  { sym:"Q",   desc:"Flow rate",          units:["m3/s","m3/d","L/s"],toBase:[1,1/86400,0.001] },
            "WL": { sym:"WL",  desc:"Weir length",        units:["m","ft"],           toBase:[1,0.3048] }
          },
          solvers:{
            "WOR": v=>({ val:v.Q/v.WL,   rearr:"WOR = Q / WL", sub:"Q="+fN(v.Q)+", WL="+fN(v.WL) }),
            "Q":   v=>({ val:v.WOR*v.WL, rearr:"Q = WOR x WL", sub:"WOR="+fN(v.WOR)+", WL="+fN(v.WL) }),
            "WL":  v=>({ val:v.Q/v.WOR,  rearr:"WL = Q / WOR", sub:"Q="+fN(v.Q)+", WOR="+fN(v.WOR) })
          }
        },

        // ── Percent removal ──────────────────────────────────────
        {
          id:"removal", name:"Percent Particle Removal",
          formula:"P = 100 x (v_s / v_o)",
          desc:"Fraction of particles removed in ideal sedimentation. (EQN 6-33)",
          ref:"EQN 6-33",
          vars:{
            "P":  { sym:"P",   desc:"Percent removal",            units:["%"],               toBase:[1] },
            "vs": { sym:"v_s", desc:"Particle settling velocity", units:["m/s","m/d","m/h"], toBase:[1,1/86400,1/3600] },
            "vo": { sym:"v_o", desc:"Overflow rate",              units:["m/s","m/d","m/h"], toBase:[1,1/86400,1/3600] }
          },
          solvers:{
            "P":  v=>({ val:100*v.vs/v.vo, rearr:"P = 100 x (v_s / v_o)", sub:"v_s="+fN(v.vs)+", v_o="+fN(v.vo) }),
            "vs": v=>({ val:v.P*v.vo/100,  rearr:"v_s = P x v_o / 100",   sub:"P="+fN(v.P)+", v_o="+fN(v.vo) }),
            "vo": v=>({ val:100*v.vs/v.P,  rearr:"v_o = 100 x v_s / P",   sub:"v_s="+fN(v.vs)+", P="+fN(v.P) })
          }
        },

        // ── Filter loading rate ──────────────────────────────────
        {
          id:"filter_va", name:"Filter Hydraulic Loading Rate",
          formula:"v_a = Q / A_s",
          desc:"Filtration rate through filter media. Controls run time between backwashes. (EQN 6-47)",
          ref:"EQN 6-47",
          vars:{
            "va":{ sym:"v_a", desc:"Filter loading rate",  units:["m/s","m/h","m/d"],  toBase:[1,1/3600,1/86400] },
            "Q": { sym:"Q",   desc:"Flow rate",            units:["m3/s","m3/d","L/s"],toBase:[1,1/86400,0.001] },
            "As":{ sym:"A_s", desc:"Filter surface area",  units:["m2","ft2"],         toBase:[1,0.0929] }
          },
          solvers:{
            "va": v=>({ val:v.Q/v.As,  rearr:"v_a = Q / A_s", sub:"Q="+fN(v.Q)+", A_s="+fN(v.As) }),
            "Q":  v=>({ val:v.va*v.As, rearr:"Q = v_a x A_s", sub:"v_a="+fN(v.va)+", A_s="+fN(v.As) }),
            "As": v=>({ val:v.Q/v.va,  rearr:"A_s = Q / v_a", sub:"Q="+fN(v.Q)+", v_a="+fN(v.va) })
          }
        },

        // ── Chick-Watson disinfection ────────────────────────────
        {
          id:"disinfect", name:"Chick-Watson Disinfection (CT Model)",
          formula:"log(Co/Ct) = log(No/Nt) = k' x C x t",
          desc:"CT model for pathogen log-inactivation with chemical disinfectants. (EQN 6-65/6-66)",
          ref:"EQN 6-65/6-66",
          vars:{
            "No":{ sym:"No",  desc:"Initial pathogen count",     units:["count/mL","MPN/100mL"], toBase:[1,0.01] },
            "Nt":{ sym:"Nt",  desc:"Pathogen count at time t",   units:["count/mL","MPN/100mL"], toBase:[1,0.01] },
            "kp":{ sym:"k'",  desc:"Chick-Watson rate constant", units:["L/(mg*min)"],            toBase:[1] },
            "C": { sym:"C",   desc:"Disinfectant concentration", units:["mg/L"],                  toBase:[1] },
            "t": { sym:"t",   desc:"Contact time",               units:["min","s","h"],           toBase:[1,1/60,60] }
          },
          solvers:{
            "Nt": v=>({ val:v.No/Math.pow(10,v.kp*v.C*v.t),      rearr:"Nt = No / 10^(k' x C x t)",     sub:"No="+fN(v.No)+", k'="+fN(v.kp)+", C="+fN(v.C)+", t="+fN(v.t) }),
            "No": v=>({ val:v.Nt*Math.pow(10,v.kp*v.C*v.t),      rearr:"No = Nt x 10^(k' x C x t)",     sub:"Nt="+fN(v.Nt)+", k'="+fN(v.kp)+", C="+fN(v.C)+", t="+fN(v.t) }),
            "kp": v=>({ val:Math.log10(v.No/v.Nt)/(v.C*v.t),     rearr:"k' = log10(No/Nt) / (C x t)",   sub:"No="+fN(v.No)+", Nt="+fN(v.Nt)+", C="+fN(v.C)+", t="+fN(v.t) }),
            "C":  v=>({ val:Math.log10(v.No/v.Nt)/(v.kp*v.t),    rearr:"C = log10(No/Nt) / (k' x t)",   sub:"No="+fN(v.No)+", Nt="+fN(v.Nt)+", k'="+fN(v.kp)+", t="+fN(v.t) }),
            "t":  v=>({ val:Math.log10(v.No/v.Nt)/(v.kp*v.C),    rearr:"t = log10(No/Nt) / (k' x C)",   sub:"No="+fN(v.No)+", Nt="+fN(v.Nt)+", k'="+fN(v.kp)+", C="+fN(v.C) })
          }
        },

        // ── Freundlich isotherm ──────────────────────────────────
        {
          id:"freundlich", name:"Freundlich Isotherm",
          formula:"q_e = K_F x C_e^n",
          desc:"Adsorption equilibrium relationship for GAC and other adsorbents. (Class EQN)",
          ref:"Class EQN",
          vars:{
            "qe":{ sym:"q_e", desc:"Mass adsorbed / mass adsorbent",  units:["mg/g","ug/g"],       toBase:[1,0.001] },
            "KF":{ sym:"K_F", desc:"Freundlich capacity constant",    units:["(mg/g)(L/mg)^n"],    toBase:[1] },
            "Ce":{ sym:"C_e", desc:"Equilibrium liquid concentration", units:["mg/L","ug/L"],       toBase:[1,0.001] },
            "n": { sym:"n",   desc:"Freundlich intensity constant",   units:["dimensionless"],      toBase:[1] }
          },
          solvers:{
            "qe": v=>({ val:v.KF*Math.pow(v.Ce,v.n),             rearr:"q_e = K_F x C_e^n",         sub:"K_F="+fN(v.KF)+", C_e="+fN(v.Ce)+", n="+fN(v.n) }),
            "Ce": v=>({ val:Math.pow(v.qe/v.KF,1/v.n),           rearr:"C_e = (q_e / K_F)^(1/n)",   sub:"q_e="+fN(v.qe)+", K_F="+fN(v.KF)+", n="+fN(v.n) }),
            "KF": v=>({ val:v.qe/Math.pow(v.Ce,v.n),             rearr:"K_F = q_e / C_e^n",         sub:"q_e="+fN(v.qe)+", C_e="+fN(v.Ce)+", n="+fN(v.n) }),
            "n":  v=>({ val:Math.log(v.qe/v.KF)/Math.log(v.Ce),  rearr:"n = log(q_e/K_F)/log(C_e)", sub:"q_e="+fN(v.qe)+", K_F="+fN(v.KF)+", C_e="+fN(v.Ce) })
          }
        },

        // ── Batch adsorption ─────────────────────────────────────
        {
          id:"freundlich_batch", name:"Batch Adsorption Mass Balance",
          formula:"q_e = (C_o - C_e) x V / m",
          desc:"Specific uptake from a batch isotherm test. (Class EQN)",
          ref:"Class EQN",
          vars:{
            "qe":{ sym:"q_e", desc:"Specific uptake",           units:["mg/g"],  toBase:[1] },
            "Co":{ sym:"C_o", desc:"Initial concentration",     units:["mg/L"],  toBase:[1] },
            "Ce":{ sym:"C_e", desc:"Equilibrium concentration", units:["mg/L"],  toBase:[1] },
            "V": { sym:"V",   desc:"Solution volume",           units:["L","m3"],toBase:[1,1000] },
            "m": { sym:"m",   desc:"Mass of adsorbent",         units:["g","kg"],toBase:[1,1000] }
          },
          solvers:{
            "qe": v=>({ val:(v.Co-v.Ce)*v.V/v.m,   rearr:"q_e = (C_o - C_e) x V / m",  sub:"C_o="+fN(v.Co)+", C_e="+fN(v.Ce)+", V="+fN(v.V)+", m="+fN(v.m) }),
            "Ce": v=>({ val:v.Co-v.qe*v.m/v.V,     rearr:"C_e = C_o - (q_e x m) / V",  sub:"C_o="+fN(v.Co)+", q_e="+fN(v.qe)+", m="+fN(v.m)+", V="+fN(v.V) }),
            "Co": v=>({ val:v.Ce+v.qe*v.m/v.V,     rearr:"C_o = C_e + (q_e x m) / V",  sub:"C_e="+fN(v.Ce)+", q_e="+fN(v.qe)+", m="+fN(v.m)+", V="+fN(v.V) }),
            "V":  v=>({ val:v.qe*v.m/(v.Co-v.Ce),  rearr:"V = q_e x m / (C_o - C_e)",  sub:"q_e="+fN(v.qe)+", m="+fN(v.m)+", C_o="+fN(v.Co)+", C_e="+fN(v.Ce) }),
            "m":  v=>({ val:(v.Co-v.Ce)*v.V/v.qe,  rearr:"m = (C_o - C_e) x V / q_e",  sub:"C_o="+fN(v.Co)+", C_e="+fN(v.Ce)+", V="+fN(v.V)+", q_e="+fN(v.qe) })
          }
        }

      ] // end drinking equations
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 3 — WASTEWATER TREATMENT
    // BOD, DO Sag, Activated Sludge, Microbiology
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "wastewater",
      title: "Wastewater Treatment",
      desc:  "BOD, DO sag curve, activated sludge, biological treatment",
      equations: [

        // ── BOD exerted ──────────────────────────────────────────
        {
          id:"bod_exerted", name:"BOD Exerted at Time t",
          formula:"BOD_t = L_o x (1 - exp(-k x t))",
          desc:"Cumulative oxygen demand exerted over time. (EQN 7-4)",
          ref:"EQN 7-4",
          vars:{
            "BODt":{ sym:"BOD_t", desc:"BOD exerted (O2 consumed)", units:["mg/L"],      toBase:[1] },
            "Lo":  { sym:"L_o",   desc:"Ultimate BOD",              units:["mg/L"],      toBase:[1] },
            "k":   { sym:"k",     desc:"BOD rate constant",         units:["1/d","1/h"], toBase:[1,24] },
            "t":   { sym:"t",     desc:"Time",                      units:["d","h"],     toBase:[1,1/24] }
          },
          solvers:{
            "BODt": v=>({ val:v.Lo*(1-Math.exp(-v.k*v.t)),        rearr:"BOD_t = L_o x (1 - e^(-k x t))",  sub:"L_o="+fN(v.Lo)+", k="+fN(v.k)+", t="+fN(v.t) }),
            "Lo":   v=>({ val:v.BODt/(1-Math.exp(-v.k*v.t)),      rearr:"L_o = BOD_t / (1 - e^(-k x t))",  sub:"BOD_t="+fN(v.BODt)+", k="+fN(v.k)+", t="+fN(v.t) }),
            "k":    v=>({ val:-Math.log(1-v.BODt/v.Lo)/v.t,       rearr:"k = -ln(1 - BOD_t/L_o) / t",      sub:"BOD_t="+fN(v.BODt)+", L_o="+fN(v.Lo)+", t="+fN(v.t) }),
            "t":    v=>({ val:-Math.log(1-v.BODt/v.Lo)/v.k,       rearr:"t = -ln(1 - BOD_t/L_o) / k",      sub:"BOD_t="+fN(v.BODt)+", L_o="+fN(v.Lo)+", k="+fN(v.k) })
          }
        },

        // ── BOD remaining ────────────────────────────────────────
        {
          id:"bod_remain", name:"BOD Remaining at Time t",
          formula:"L_t = L_o x exp(-k_d x t)",
          desc:"Remaining oxygen demand in stream at time t. (EQN 7-3)",
          ref:"EQN 7-3",
          vars:{
            "Lt":{ sym:"L_t", desc:"BOD remaining at t",  units:["mg/L"],      toBase:[1] },
            "Lo":{ sym:"L_o", desc:"Ultimate BOD",         units:["mg/L"],      toBase:[1] },
            "kd":{ sym:"k_d", desc:"Deoxygenation rate",   units:["1/d","1/h"], toBase:[1,24] },
            "t": { sym:"t",   desc:"Time",                 units:["d","h"],     toBase:[1,1/24] }
          },
          solvers:{
            "Lt": v=>({ val:v.Lo*Math.exp(-v.kd*v.t),   rearr:"L_t = L_o x e^(-k_d x t)", sub:"L_o="+fN(v.Lo)+", k_d="+fN(v.kd)+", t="+fN(v.t) }),
            "Lo": v=>({ val:v.Lt/Math.exp(-v.kd*v.t),   rearr:"L_o = L_t / e^(-k_d x t)", sub:"L_t="+fN(v.Lt)+", k_d="+fN(v.kd)+", t="+fN(v.t) }),
            "kd": v=>({ val:-Math.log(v.Lt/v.Lo)/v.t,   rearr:"k_d = -ln(L_t/L_o) / t",   sub:"L_t="+fN(v.Lt)+", L_o="+fN(v.Lo)+", t="+fN(v.t) }),
            "t":  v=>({ val:-Math.log(v.Lt/v.Lo)/v.kd,  rearr:"t = -ln(L_t/L_o) / k_d",   sub:"L_t="+fN(v.Lt)+", L_o="+fN(v.Lo)+", k_d="+fN(v.kd) })
          }
        },

        // ── Temperature correction ───────────────────────────────
        {
          id:"tcorr", name:"Temperature Correction for Rate Constants",
          formula:"k_T = k20 x theta^(T-20)",
          desc:"Adjusts k or k_d for temperature. theta=1.135 (4-20C) or 1.056 (20-30C) for k/kd; theta=1.024 for kr. (EQN 7-6)",
          ref:"EQN 7-6",
          vars:{
            "kT":   { sym:"k_T",  desc:"Rate constant at temp T",        units:["1/d"],           toBase:[1] },
            "k20":  { sym:"k20",  desc:"Rate constant at 20 C",          units:["1/d"],           toBase:[1] },
            "theta":{ sym:"theta",desc:"Temp correction factor",         units:["dimensionless"], toBase:[1] },
            "T":    { sym:"T",    desc:"Water temperature",              units:["C"],             toBase:[1] }
          },
          solvers:{
            "kT":   v=>({ val:v.k20*Math.pow(v.theta,v.T-20),             rearr:"k_T = k20 x theta^(T-20)",          sub:"k20="+fN(v.k20)+", theta="+fN(v.theta)+", T="+fN(v.T)+"C" }),
            "k20":  v=>({ val:v.kT/Math.pow(v.theta,v.T-20),              rearr:"k20 = k_T / theta^(T-20)",          sub:"k_T="+fN(v.kT)+", theta="+fN(v.theta)+", T="+fN(v.T)+"C" }),
            "T":    v=>({ val:20+Math.log(v.kT/v.k20)/Math.log(v.theta),  rearr:"T = 20 + ln(k_T/k20) / ln(theta)", sub:"k_T="+fN(v.kT)+", k20="+fN(v.k20)+", theta="+fN(v.theta) }),
            "theta":v=>({ val:Math.pow(v.kT/v.k20,1/(v.T-20)),            rearr:"theta = (k_T/k20)^(1/(T-20))",     sub:"k_T="+fN(v.kT)+", k20="+fN(v.k20)+", T="+fN(v.T) })
          }
        },

        // ── DO deficit ───────────────────────────────────────────
        {
          id:"do_deficit", name:"DO Deficit",
          formula:"D = D_s - DO",
          desc:"Dissolved oxygen deficit — difference between saturation and actual DO. (EQN 7-21)",
          ref:"EQN 7-21",
          vars:{
            "D":  { sym:"D",   desc:"DO deficit",    units:["mg/L"], toBase:[1] },
            "Ds": { sym:"D_s", desc:"Saturation DO", units:["mg/L"], toBase:[1] },
            "DO": { sym:"DO",  desc:"Actual DO",     units:["mg/L"], toBase:[1] }
          },
          solvers:{
            "D":  v=>({ val:v.Ds-v.DO, rearr:"D = D_s - DO", sub:"D_s="+fN(v.Ds)+", DO="+fN(v.DO) }),
            "DO": v=>({ val:v.Ds-v.D,  rearr:"DO = D_s - D", sub:"D_s="+fN(v.Ds)+", D="+fN(v.D) }),
            "Ds": v=>({ val:v.D+v.DO,  rearr:"D_s = D + DO", sub:"D="+fN(v.D)+", DO="+fN(v.DO) })
          }
        },

        // ── DO sag curve ─────────────────────────────────────────
        {
          id:"do_sag", name:"DO Sag Curve — Deficit at Time t",
          formula:"D_t = (k_d*L_o/(k_r-k_d))*(e^(-k_d*t)-e^(-k_r*t)) + D_o*e^(-k_r*t)",
          desc:"Streeter-Phelps DO sag equation. Deficit at any point downstream. (EQN 7-36)",
          ref:"EQN 7-36",
          vars:{
            "Dt":{ sym:"D_t", desc:"DO deficit at time t",      units:["mg/L"],  toBase:[1] },
            "kd":{ sym:"k_d", desc:"Deoxygenation rate",        units:["1/d"],   toBase:[1] },
            "Lo":{ sym:"L_o", desc:"Ultimate BOD at mix point", units:["mg/L"],  toBase:[1] },
            "kr":{ sym:"k_r", desc:"Reaeration rate",           units:["1/d"],   toBase:[1] },
            "t": { sym:"t",   desc:"Travel time",               units:["d","h"], toBase:[1,1/24] },
            "Do":{ sym:"D_o", desc:"Initial DO deficit at mix", units:["mg/L"],  toBase:[1] }
          },
          solvers:{
            "Dt": v=>{
              const val=(v.kd*v.Lo/(v.kr-v.kd))*(Math.exp(-v.kd*v.t)-Math.exp(-v.kr*v.t))+v.Do*Math.exp(-v.kr*v.t);
              return { val, rearr:"D_t = (k_d*L_o/(k_r-k_d))*(e^(-k_d*t)-e^(-k_r*t)) + D_o*e^(-k_r*t)", sub:"k_d="+fN(v.kd)+", L_o="+fN(v.Lo)+", k_r="+fN(v.kr)+", t="+fN(v.t)+", D_o="+fN(v.Do) };
            },
            "Lo": v=>{
              const val=(v.Dt-v.Do*Math.exp(-v.kr*v.t))*(v.kr-v.kd)/(v.kd*(Math.exp(-v.kd*v.t)-Math.exp(-v.kr*v.t)));
              return { val, rearr:"L_o = (D_t - D_o*e^(-k_r*t))*(k_r-k_d) / (k_d*(e^(-k_d*t)-e^(-k_r*t)))", sub:"D_t="+fN(v.Dt)+", D_o="+fN(v.Do)+", k_r="+fN(v.kr)+", k_d="+fN(v.kd)+", t="+fN(v.t) };
            },
            "Do": v=>{
              const val=(v.Dt-(v.kd*v.Lo/(v.kr-v.kd))*(Math.exp(-v.kd*v.t)-Math.exp(-v.kr*v.t)))/Math.exp(-v.kr*v.t);
              return { val, rearr:"D_o = (D_t - (k_d*L_o/(k_r-k_d))*(e^(-k_d*t)-e^(-k_r*t))) / e^(-k_r*t)", sub:"D_t="+fN(v.Dt)+", k_d="+fN(v.kd)+", L_o="+fN(v.Lo)+", k_r="+fN(v.kr)+", t="+fN(v.t) };
            }
          }
        },

        // ── DO sag critical time ─────────────────────────────────
        {
          id:"do_sag_tc", name:"DO Sag — Critical Time",
          formula:"t_c = [1/(k_r-k_d)] x ln[(k_r/k_d)*(1 - D_o*(k_r-k_d)/(k_d*L_o))]",
          desc:"Time at which minimum DO (maximum deficit) occurs. (EQN 7-31)",
          ref:"EQN 7-31",
          vars:{
            "tc":{ sym:"t_c", desc:"Critical time (time of min DO)", units:["d"],   toBase:[1] },
            "kd":{ sym:"k_d", desc:"Deoxygenation rate",             units:["1/d"], toBase:[1] },
            "kr":{ sym:"k_r", desc:"Reaeration rate",                units:["1/d"], toBase:[1] },
            "Do":{ sym:"D_o", desc:"Initial DO deficit at mix point",units:["mg/L"],toBase:[1] },
            "Lo":{ sym:"L_o", desc:"Ultimate BOD at mix point",      units:["mg/L"],toBase:[1] }
          },
          solvers:{
            "tc": v=>{
              const val=(1/(v.kr-v.kd))*Math.log((v.kr/v.kd)*(1-v.Do*(v.kr-v.kd)/(v.kd*v.Lo)));
              return { val, rearr:"t_c = [1/(k_r-k_d)] x ln[(k_r/k_d)*(1 - D_o*(k_r-k_d)/(k_d*L_o))]", sub:"k_d="+fN(v.kd)+", k_r="+fN(v.kr)+", D_o="+fN(v.Do)+", L_o="+fN(v.Lo) };
            },
            "Lo": v=>{
              const inner=Math.exp(v.tc*(v.kr-v.kd))*(v.kd/v.kr);
              const val=v.Do*(v.kr-v.kd)/(v.kd*(1-inner));
              return { val, rearr:"L_o = D_o*(k_r-k_d) / (k_d*(1 - (k_d/k_r)*e^(t_c*(k_r-k_d))))", sub:"t_c="+fN(v.tc)+", k_d="+fN(v.kd)+", k_r="+fN(v.kr)+", D_o="+fN(v.Do) };
            },
            "Do": v=>{
              const val=v.kd*v.Lo/(v.kr-v.kd)*(1-(v.kr/v.kd)*Math.exp(-v.tc*(v.kr-v.kd)));
              return { val, rearr:"D_o = k_d*L_o/(k_r-k_d) * (1 - (k_r/k_d)*e^(-t_c*(k_r-k_d)))", sub:"t_c="+fN(v.tc)+", k_d="+fN(v.kd)+", k_r="+fN(v.kr)+", L_o="+fN(v.Lo) };
            }
          }
        },

        // ── Wastewater microbiology growth ───────────────────────
        {
          id:"microbio", name:"Wastewater Microbiology — Population Growth",
          formula:"log(P) = log(P0) + (t/t_d) x log(2)",
          desc:"Microbial population growth. P0 = initial count, t_d = doubling time. (EQN 8-2)",
          ref:"EQN 8-2",
          vars:{
            "P":  { sym:"P",   desc:"Population at time t",  units:["count","MPN"], toBase:[1,1] },
            "P0": { sym:"P0",  desc:"Initial population",    units:["count","MPN"], toBase:[1,1] },
            "t":  { sym:"t",   desc:"Elapsed time",          units:["h","d"],       toBase:[1,24] },
            "td": { sym:"t_d", desc:"Doubling time",         units:["h","d"],       toBase:[1,24] }
          },
          solvers:{
            "P":  v=>({ val:v.P0*Math.pow(2,v.t/v.td),                          rearr:"P = P0 x 2^(t/t_d)",                sub:"P0="+fN(v.P0)+", t="+fN(v.t)+", t_d="+fN(v.td) }),
            "P0": v=>({ val:v.P/Math.pow(2,v.t/v.td),                           rearr:"P0 = P / 2^(t/t_d)",               sub:"P="+fN(v.P)+", t="+fN(v.t)+", t_d="+fN(v.td) }),
            "t":  v=>({ val:v.td*Math.log(v.P/v.P0)/Math.log(2),               rearr:"t = t_d x log(P/P0) / log(2)",     sub:"P="+fN(v.P)+", P0="+fN(v.P0)+", t_d="+fN(v.td) }),
            "td": v=>({ val:v.t*Math.log(2)/Math.log(v.P/v.P0),                rearr:"t_d = t x log(2) / log(P/P0)",     sub:"P="+fN(v.P)+", P0="+fN(v.P0)+", t="+fN(v.t) })
          }
        },

        // ── Monod kinetics / net growth ──────────────────────────
        {
          id:"monod", name:"Monod Kinetics — Net Specific Growth Rate",
          formula:"dX/dt = (mu_m*S/(K_s+S) - k_d) * X",
          desc:"Net biomass growth rate. mu_m = max growth rate, K_s = half-saturation constant. (EQN 9-58/9-60)",
          ref:"EQN 9-58/9-60",
          vars:{
            "mu_m":{ sym:"mu_m", desc:"Max specific growth rate",  units:["1/d"],  toBase:[1] },
            "S":   { sym:"S",    desc:"Substrate concentration",   units:["mg/L"], toBase:[1] },
            "Ks":  { sym:"K_s",  desc:"Half-saturation constant",  units:["mg/L"], toBase:[1] },
            "kd":  { sym:"k_d",  desc:"Endogenous decay rate",     units:["1/d"],  toBase:[1] },
            "X":   { sym:"X",    desc:"Biomass concentration",     units:["mg/L"], toBase:[1] },
            "net": { sym:"dX/dt",desc:"Net biomass growth rate",   units:["mg/L/d"],toBase:[1] }
          },
          solvers:{
            "net": v=>{
              const mu=v.mu_m*v.S/(v.Ks+v.S);
              return { val:(mu-v.kd)*v.X, rearr:"dX/dt = (mu_m*S/(K_s+S) - k_d) * X", sub:"mu_m="+fN(v.mu_m)+", S="+fN(v.S)+", K_s="+fN(v.Ks)+", k_d="+fN(v.kd)+", X="+fN(v.X) };
            },
            "X": v=>{
              const mu=v.mu_m*v.S/(v.Ks+v.S);
              return { val:v.net/(mu-v.kd), rearr:"X = (dX/dt) / (mu_m*S/(K_s+S) - k_d)", sub:"net="+fN(v.net)+", mu_m="+fN(v.mu_m)+", S="+fN(v.S)+", K_s="+fN(v.Ks)+", k_d="+fN(v.kd) };
            },
            "S": v=>({ val:v.Ks*v.kd/(v.mu_m-v.kd), rearr:"S (at net=0) = K_s*k_d / (mu_m - k_d)", sub:"K_s="+fN(v.Ks)+", k_d="+fN(v.kd)+", mu_m="+fN(v.mu_m) })
          }
        },

        // ── Effluent substrate from SRT ──────────────────────────
        {
          id:"effluent_S", name:"Effluent Substrate from SRT",
          formula:"S = K_s*(1 + k_d*theta_c) / (theta_c*(mu_m - k_d) - 1)",
          desc:"Steady-state effluent BOD/substrate from activated sludge. (EQN 9-58)",
          ref:"EQN 9-58",
          vars:{
            "S":      { sym:"S",       desc:"Effluent substrate",         units:["mg/L"], toBase:[1] },
            "Ks":     { sym:"K_s",     desc:"Half-saturation constant",   units:["mg/L"], toBase:[1] },
            "kd":     { sym:"k_d",     desc:"Endogenous decay rate",      units:["1/d"],  toBase:[1] },
            "thetac": { sym:"theta_c", desc:"Solids retention time (SRT)",units:["d"],    toBase:[1] },
            "mu_m":   { sym:"mu_m",    desc:"Max specific growth rate",   units:["1/d"],  toBase:[1] }
          },
          solvers:{
            "S": v=>{
              const val=v.Ks*(1+v.kd*v.thetac)/(v.thetac*(v.mu_m-v.kd)-1);
              return { val, rearr:"S = K_s*(1+k_d*theta_c) / (theta_c*(mu_m-k_d) - 1)", sub:"K_s="+fN(v.Ks)+", k_d="+fN(v.kd)+", theta_c="+fN(v.thetac)+", mu_m="+fN(v.mu_m) };
            },
            "thetac": v=>{
              const val=(v.Ks*v.kd+v.S*v.kd+v.Ks)/(v.S*(v.mu_m-v.kd)-v.Ks*v.kd);
              return { val, rearr:"theta_c = (K_s*k_d + S*k_d + K_s) / (S*(mu_m-k_d) - K_s*k_d)", sub:"S="+fN(v.S)+", K_s="+fN(v.Ks)+", k_d="+fN(v.kd)+", mu_m="+fN(v.mu_m) };
            }
          }
        },

        // ── Biomass concentration X ──────────────────────────────
        {
          id:"biomass_X", name:"Biomass Concentration (X)",
          formula:"X = theta_c*Y*(S_o-S) / (1 + k_d*theta_c)",
          desc:"MLVSS in activated sludge reactor at steady state. (EQN 9-7)",
          ref:"EQN 9-7",
          vars:{
            "X":      { sym:"X",       desc:"Biomass MLVSS",              units:["mg/L","g/m3"],       toBase:[1,1] },
            "thetac": { sym:"theta_c", desc:"Solids Retention Time (SRT)",units:["d"],                 toBase:[1] },
            "Y":      { sym:"Y",       desc:"True yield coefficient",     units:["mg VSS/mg BOD"],     toBase:[1] },
            "So":     { sym:"S_o",     desc:"Influent BOD / substrate",   units:["mg/L","g/m3"],       toBase:[1,1] },
            "S":      { sym:"S",       desc:"Effluent BOD / substrate",   units:["mg/L","g/m3"],       toBase:[1,1] },
            "kd":     { sym:"k_d",     desc:"Endogenous decay rate",      units:["1/d"],               toBase:[1] }
          },
          solvers:{
            "X":      v=>({ val:v.thetac*v.Y*(v.So-v.S)/(1+v.kd*v.thetac),                rearr:"X = theta_c*Y*(S_o-S) / (1 + k_d*theta_c)",        sub:"theta_c="+fN(v.thetac)+", Y="+fN(v.Y)+", S_o="+fN(v.So)+", S="+fN(v.S)+", k_d="+fN(v.kd) }),
            "S":      v=>({ val:v.So-v.X*(1+v.kd*v.thetac)/(v.thetac*v.Y),                rearr:"S = S_o - X*(1+k_d*theta_c)/(theta_c*Y)",           sub:"X="+fN(v.X)+", S_o="+fN(v.So)+", theta_c="+fN(v.thetac)+", Y="+fN(v.Y)+", k_d="+fN(v.kd) }),
            "So":     v=>({ val:v.S+v.X*(1+v.kd*v.thetac)/(v.thetac*v.Y),                 rearr:"S_o = S + X*(1+k_d*theta_c)/(theta_c*Y)",           sub:"S="+fN(v.S)+", X="+fN(v.X)+", theta_c="+fN(v.thetac)+", Y="+fN(v.Y)+", k_d="+fN(v.kd) }),
            "Y":      v=>({ val:v.X*(1+v.kd*v.thetac)/(v.thetac*(v.So-v.S)),              rearr:"Y = X*(1+k_d*theta_c) / (theta_c*(S_o-S))",         sub:"X="+fN(v.X)+", k_d="+fN(v.kd)+", theta_c="+fN(v.thetac)+", S_o="+fN(v.So)+", S="+fN(v.S) }),
            "thetac": v=>({ val:v.X/(v.Y*(v.So-v.S)-v.kd*v.X),                            rearr:"theta_c = X / (Y*(S_o-S) - k_d*X)",                 sub:"X="+fN(v.X)+", Y="+fN(v.Y)+", S_o="+fN(v.So)+", S="+fN(v.S)+", k_d="+fN(v.kd) }),
            "kd":     v=>({ val:(v.thetac*v.Y*(v.So-v.S)-v.X)/(v.thetac*v.X),             rearr:"k_d = (theta_c*Y*(S_o-S) - X) / (theta_c*X)",       sub:"theta_c="+fN(v.thetac)+", Y="+fN(v.Y)+", S_o="+fN(v.So)+", S="+fN(v.S)+", X="+fN(v.X) })
          }
        },

        // ── Observed yield ───────────────────────────────────────
        {
          id:"Yobs", name:"Observed Yield",
          formula:"Y_obs = Y / (1 + k_d*theta_c)",
          desc:"Net cell yield after endogenous respiration. (EQN 9-26)",
          ref:"EQN 9-26",
          vars:{
            "Yobs":   { sym:"Y_obs",   desc:"Observed yield", units:["dimensionless"],toBase:[1] },
            "Y":      { sym:"Y",       desc:"True yield",     units:["dimensionless"],toBase:[1] },
            "kd":     { sym:"k_d",     desc:"Decay rate",     units:["1/d"],          toBase:[1] },
            "thetac": { sym:"theta_c", desc:"SRT",            units:["d"],            toBase:[1] }
          },
          solvers:{
            "Yobs":   v=>({ val:v.Y/(1+v.kd*v.thetac),    rearr:"Y_obs = Y / (1 + k_d*theta_c)",   sub:"Y="+fN(v.Y)+", k_d="+fN(v.kd)+", theta_c="+fN(v.thetac) }),
            "Y":      v=>({ val:v.Yobs*(1+v.kd*v.thetac), rearr:"Y = Y_obs * (1 + k_d*theta_c)",   sub:"Y_obs="+fN(v.Yobs)+", k_d="+fN(v.kd)+", theta_c="+fN(v.thetac) }),
            "kd":     v=>({ val:(v.Y/v.Yobs-1)/v.thetac,  rearr:"k_d = (Y/Y_obs - 1) / theta_c",   sub:"Y="+fN(v.Y)+", Y_obs="+fN(v.Yobs)+", theta_c="+fN(v.thetac) }),
            "thetac": v=>({ val:(v.Y/v.Yobs-1)/v.kd,      rearr:"theta_c = (Y/Y_obs - 1) / k_d",   sub:"Y="+fN(v.Y)+", Y_obs="+fN(v.Yobs)+", k_d="+fN(v.kd) })
          }
        },

        // ── SRT ─────────────────────────────────────────────────
        {
          id:"srt", name:"Solids Retention Time (SRT / theta_c)",
          formula:"theta_c = V*X / (Q_w*X_w)",
          desc:"Mean cell residence time. Primary design parameter for biological treatment. (EQN 9-27)",
          ref:"EQN 9-27",
          vars:{
            "thetac":{ sym:"theta_c", desc:"SRT",               units:["d"],           toBase:[1] },
            "V":     { sym:"V",       desc:"Reactor volume",     units:["m3"],          toBase:[1] },
            "X":     { sym:"X",       desc:"Reactor MLVSS",      units:["mg/L","g/m3"], toBase:[1,1] },
            "Qw":    { sym:"Q_w",     desc:"Waste sludge flow",  units:["m3/d"],        toBase:[1] },
            "Xw":    { sym:"X_w",     desc:"Waste sludge VSS",   units:["mg/L","g/m3"], toBase:[1,1] }
          },
          solvers:{
            "thetac": v=>({ val:v.V*v.X/(v.Qw*v.Xw),     rearr:"theta_c = V*X / (Q_w*X_w)",   sub:"V="+fN(v.V)+", X="+fN(v.X)+", Q_w="+fN(v.Qw)+", X_w="+fN(v.Xw) }),
            "V":      v=>({ val:v.thetac*v.Qw*v.Xw/v.X,  rearr:"V = theta_c*Q_w*X_w / X",     sub:"theta_c="+fN(v.thetac)+", Q_w="+fN(v.Qw)+", X_w="+fN(v.Xw)+", X="+fN(v.X) }),
            "X":      v=>({ val:v.thetac*v.Qw*v.Xw/v.V,  rearr:"X = theta_c*Q_w*X_w / V",     sub:"theta_c="+fN(v.thetac)+", Q_w="+fN(v.Qw)+", X_w="+fN(v.Xw)+", V="+fN(v.V) }),
            "Qw":     v=>({ val:v.V*v.X/(v.thetac*v.Xw), rearr:"Q_w = V*X / (theta_c*X_w)",   sub:"V="+fN(v.V)+", X="+fN(v.X)+", theta_c="+fN(v.thetac)+", X_w="+fN(v.Xw) }),
            "Xw":     v=>({ val:v.V*v.X/(v.thetac*v.Qw), rearr:"X_w = V*X / (theta_c*Q_w)",   sub:"V="+fN(v.V)+", X="+fN(v.X)+", theta_c="+fN(v.thetac)+", Q_w="+fN(v.Qw) })
          }
        },

        // ── F/M ratio ────────────────────────────────────────────
        {
          id:"fm_ratio", name:"F/M Ratio",
          formula:"F/M = Q*S_o / (V*X)",
          desc:"Food-to-microorganism loading ratio for activated sludge design. (EQN 9-28)",
          ref:"EQN 9-28",
          vars:{
            "FM":{ sym:"F/M",  desc:"F/M ratio",     units:["kg BOD/(kg VSS*d)"],toBase:[1] },
            "Q": { sym:"Q",    desc:"Flow rate",      units:["m3/d"],             toBase:[1] },
            "So":{ sym:"S_o",  desc:"Influent BOD",   units:["g/m3","mg/L"],      toBase:[1,1] },
            "V": { sym:"V",    desc:"Reactor volume", units:["m3"],               toBase:[1] },
            "X": { sym:"X",    desc:"MLVSS",          units:["g/m3","mg/L"],      toBase:[1,1] }
          },
          solvers:{
            "FM": v=>({ val:v.Q*v.So/(v.V*v.X),  rearr:"F/M = Q*S_o / (V*X)",   sub:"Q="+fN(v.Q)+", S_o="+fN(v.So)+", V="+fN(v.V)+", X="+fN(v.X) }),
            "Q":  v=>({ val:v.FM*v.V*v.X/v.So,   rearr:"Q = F/M*V*X / S_o",     sub:"F/M="+fN(v.FM)+", V="+fN(v.V)+", X="+fN(v.X)+", S_o="+fN(v.So) }),
            "So": v=>({ val:v.FM*v.V*v.X/v.Q,    rearr:"S_o = F/M*V*X / Q",     sub:"F/M="+fN(v.FM)+", V="+fN(v.V)+", X="+fN(v.X)+", Q="+fN(v.Q) }),
            "V":  v=>({ val:v.Q*v.So/(v.FM*v.X), rearr:"V = Q*S_o / (F/M*X)",   sub:"Q="+fN(v.Q)+", S_o="+fN(v.So)+", F/M="+fN(v.FM)+", X="+fN(v.X) }),
            "X":  v=>({ val:v.Q*v.So/(v.FM*v.V), rearr:"X = Q*S_o / (F/M*V)",   sub:"Q="+fN(v.Q)+", S_o="+fN(v.So)+", F/M="+fN(v.FM)+", V="+fN(v.V) })
          }
        },

        // ── Net sludge production ────────────────────────────────
        {
          id:"sludge_Px", name:"Net Sludge Production (P_x)",
          formula:"P_x = Y_obs*Q*(S_o - S)",
          desc:"Daily mass of waste sludge produced. (EQN 9-25)",
          ref:"EQN 9-25",
          vars:{
            "Px":   { sym:"P_x",   desc:"Net sludge production", units:["kg/d","g/d"],    toBase:[1,0.001] },
            "Yobs": { sym:"Y_obs", desc:"Observed yield",         units:["kg VSS/kg BOD"], toBase:[1] },
            "Q":    { sym:"Q",     desc:"Flow rate",              units:["m3/d"],          toBase:[1] },
            "So":   { sym:"S_o",   desc:"Influent substrate",     units:["g/m3","mg/L"],   toBase:[1,1] },
            "S":    { sym:"S",     desc:"Effluent substrate",     units:["g/m3","mg/L"],   toBase:[1,1] }
          },
          solvers:{
            "Px":   v=>({ val:v.Yobs*v.Q*(v.So-v.S)/1000,         rearr:"P_x [kg/d] = Y_obs*Q*(S_o-S)/1000", sub:"Y_obs="+fN(v.Yobs)+", Q="+fN(v.Q)+", S_o="+fN(v.So)+", S="+fN(v.S) }),
            "Yobs": v=>({ val:v.Px*1000/(v.Q*(v.So-v.S)),          rearr:"Y_obs = P_x*1000 / [Q*(S_o-S)]",    sub:"P_x="+fN(v.Px)+", Q="+fN(v.Q)+", S_o="+fN(v.So)+", S="+fN(v.S) }),
            "Q":    v=>({ val:v.Px*1000/(v.Yobs*(v.So-v.S)),       rearr:"Q = P_x*1000 / [Y_obs*(S_o-S)]",    sub:"P_x="+fN(v.Px)+", Y_obs="+fN(v.Yobs)+", S_o="+fN(v.So)+", S="+fN(v.S) }),
            "So":   v=>({ val:v.S+v.Px*1000/(v.Yobs*v.Q),          rearr:"S_o = S + P_x*1000/(Y_obs*Q)",      sub:"S="+fN(v.S)+", P_x="+fN(v.Px)+", Y_obs="+fN(v.Yobs)+", Q="+fN(v.Q) }),
            "S":    v=>({ val:v.So-v.Px*1000/(v.Yobs*v.Q),         rearr:"S = S_o - P_x*1000/(Y_obs*Q)",      sub:"S_o="+fN(v.So)+", P_x="+fN(v.Px)+", Y_obs="+fN(v.Yobs)+", Q="+fN(v.Q) })
          }
        },

        // ── O2 requirement ───────────────────────────────────────
        {
          id:"o2_req", name:"O2 Requirement — Activated Sludge",
          formula:"O2 = Q*(S_o-S)/f - 1.42*P_x",
          desc:"Daily oxygen demand. f converts BOD5 to BODu (~0.68). (EQN 9-29)",
          ref:"EQN 9-29",
          vars:{
            "O2req":{ sym:"O2",  desc:"O2 required",                      units:["kg/d"],          toBase:[1] },
            "Q":    { sym:"Q",   desc:"Flow rate",                         units:["m3/d"],          toBase:[1] },
            "So":   { sym:"S_o", desc:"Influent substrate",                units:["g/m3","mg/L"],   toBase:[1,1] },
            "S":    { sym:"S",   desc:"Effluent substrate",                units:["g/m3","mg/L"],   toBase:[1,1] },
            "f":    { sym:"f",   desc:"BOD conversion factor (~0.68 BOD5 to BODu)", units:["dimensionless"],toBase:[1] },
            "Px":   { sym:"P_x", desc:"Net sludge production",            units:["kg VSS/d"],      toBase:[1] }
          },
          solvers:{
            "O2req": v=>({ val:v.Q*(v.So-v.S)/v.f/1000-1.42*v.Px,        rearr:"O2 = Q*(S_o-S)/f/1000 - 1.42*P_x",          sub:"Q="+fN(v.Q)+", S_o="+fN(v.So)+", S="+fN(v.S)+", f="+fN(v.f)+", P_x="+fN(v.Px) }),
            "Px":    v=>({ val:(v.Q*(v.So-v.S)/v.f/1000-v.O2req)/1.42,   rearr:"P_x = (Q*(S_o-S)/f/1000 - O2) / 1.42",      sub:"Q="+fN(v.Q)+", S_o="+fN(v.So)+", S="+fN(v.S)+", f="+fN(v.f)+", O2="+fN(v.O2req) }),
            "Q":     v=>({ val:(v.O2req+1.42*v.Px)*v.f*1000/(v.So-v.S),  rearr:"Q = (O2 + 1.42*P_x)*f*1000 / (S_o-S)",      sub:"O2="+fN(v.O2req)+", P_x="+fN(v.Px)+", f="+fN(v.f)+", S_o="+fN(v.So)+", S="+fN(v.S) }),
            "f":     v=>({ val:v.Q*(v.So-v.S)/1000/(v.O2req+1.42*v.Px),  rearr:"f = Q*(S_o-S)/1000 / (O2 + 1.42*P_x)",      sub:"Q="+fN(v.Q)+", S_o="+fN(v.So)+", S="+fN(v.S)+", O2="+fN(v.O2req)+", P_x="+fN(v.Px) })
          }
        },

        // ── Sludge volume ────────────────────────────────────────
        {
          id:"sludge_vol", name:"Sludge Volume (V_ss)",
          formula:"V_ss = mass / (rho * SG_ss * P_s)",
          desc:"Volume of settled sludge. Used for secondary clarifier sizing. (EQN 9-60)",
          ref:"EQN 9-60",
          vars:{
            "Vss":  { sym:"V_ss",  desc:"Sludge volume",          units:["m3","L"],          toBase:[1,0.001] },
            "mass": { sym:"mass",  desc:"Dry mass of sludge",      units:["kg","g"],          toBase:[1,0.001] },
            "rho":  { sym:"rho",   desc:"Density of water (1000)", units:["kg/m3"],           toBase:[1] },
            "SGss": { sym:"SG_ss", desc:"Specific gravity of sludge solids (typ. 1.2-1.4)", units:["dimensionless"], toBase:[1] },
            "Ps":   { sym:"P_s",   desc:"Solids fraction (decimal, e.g. 0.04 for 4%)", units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "Vss":  v=>({ val:v.mass/(v.rho*v.SGss*v.Ps),    rearr:"V_ss = mass / (rho*SG_ss*P_s)",    sub:"mass="+fN(v.mass)+", rho="+fN(v.rho)+", SG_ss="+fN(v.SGss)+", P_s="+fN(v.Ps) }),
            "mass": v=>({ val:v.Vss*v.rho*v.SGss*v.Ps,       rearr:"mass = V_ss*rho*SG_ss*P_s",        sub:"V_ss="+fN(v.Vss)+", rho="+fN(v.rho)+", SG_ss="+fN(v.SGss)+", P_s="+fN(v.Ps) }),
            "rho":  v=>({ val:v.mass/(v.Vss*v.SGss*v.Ps),    rearr:"rho = mass / (V_ss*SG_ss*P_s)",    sub:"mass="+fN(v.mass)+", V_ss="+fN(v.Vss)+", SG_ss="+fN(v.SGss)+", P_s="+fN(v.Ps) }),
            "SGss": v=>({ val:v.mass/(v.Vss*v.rho*v.Ps),     rearr:"SG_ss = mass / (V_ss*rho*P_s)",    sub:"mass="+fN(v.mass)+", V_ss="+fN(v.Vss)+", rho="+fN(v.rho)+", P_s="+fN(v.Ps) }),
            "Ps":   v=>({ val:v.mass/(v.Vss*v.rho*v.SGss),   rearr:"P_s = mass / (V_ss*rho*SG_ss)",    sub:"mass="+fN(v.mass)+", V_ss="+fN(v.Vss)+", rho="+fN(v.rho)+", SG_ss="+fN(v.SGss) })
          }
        }

      ] // end wastewater equations
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 4 — AIR POLLUTION
    // Gaussian dispersion, atmospheric stability, unit conversion
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "air",
      title: "Air Pollution",
      desc:  "Gaussian dispersion, atmospheric stability, unit conversion",
      equations: [

        // ── Atmospheric lapse rate ───────────────────────────────
        {
          id:"lapse", name:"Atmospheric Lapse Rate",
          formula:"Gamma_a = dT / dz",
          desc:"Actual lapse rate. Neutral = -0.01 C/m. Unstable if Gamma_a < -0.01 C/m. Stable if Gamma_a > -0.01 C/m. (EQN 8-18/8-19)",
          ref:"EQN 8-18/8-19",
          vars:{
            "Ga":{ sym:"Gamma_a", desc:"Actual lapse rate",            units:["C/m"],toBase:[1] },
            "dT":{ sym:"dT",      desc:"Temperature change (T2 - T1)", units:["C"],  toBase:[1] },
            "dz":{ sym:"dz",      desc:"Height change (z2 - z1)",      units:["m"],  toBase:[1] }
          },
          solvers:{
            "Ga": v=>({ val:v.dT/v.dz,  rearr:"Gamma_a = dT / dz",     sub:"dT="+fN(v.dT)+"C, dz="+fN(v.dz)+"m" }),
            "dT": v=>({ val:v.Ga*v.dz,  rearr:"dT = Gamma_a x dz",     sub:"Gamma_a="+fN(v.Ga)+", dz="+fN(v.dz) }),
            "dz": v=>({ val:v.dT/v.Ga,  rearr:"dz = dT / Gamma_a",     sub:"dT="+fN(v.dT)+", Gamma_a="+fN(v.Ga) })
          }
        },

        // ── Plume rise (Holland) ─────────────────────────────────
        {
          id:"plume_rise", name:"Plume Rise (Holland)",
          formula:"dH = v_s*d*(1.5 + 2.68e-2*P*(Ts-Ta)/Ts*d) / u",
          desc:"Holland formula for stack plume rise. (EQN 8-21)",
          ref:"EQN 8-21",
          vars:{
            "dH":{ sym:"dH",  desc:"Plume rise",                units:["m"],   toBase:[1] },
            "vs":{ sym:"v_s", desc:"Stack gas exit velocity",    units:["m/s"], toBase:[1] },
            "d": { sym:"d",   desc:"Stack inside diameter",      units:["m"],   toBase:[1] },
            "P": { sym:"P",   desc:"Atmospheric pressure",       units:["kPa"], toBase:[1] },
            "Ts":{ sym:"Ts",  desc:"Stack gas temperature",      units:["K"],   toBase:[1] },
            "Ta":{ sym:"Ta",  desc:"Ambient air temperature",    units:["K"],   toBase:[1] },
            "u": { sym:"u",   desc:"Wind speed at stack height", units:["m/s"], toBase:[1] }
          },
          solvers:{
            "dH": v=>{
              const val=v.vs*v.d*(1.5+2.68e-2*v.P*(v.Ts-v.Ta)/v.Ts*v.d)/v.u;
              return { val, rearr:"dH = v_s*d*(1.5 + 2.68e-2*P*(Ts-Ta)/Ts*d) / u", sub:"v_s="+fN(v.vs)+", d="+fN(v.d)+", P="+fN(v.P)+", Ts="+fN(v.Ts)+", Ta="+fN(v.Ta)+", u="+fN(v.u) };
            },
            "u": v=>{
              const val=v.vs*v.d*(1.5+2.68e-2*v.P*(v.Ts-v.Ta)/v.Ts*v.d)/v.dH;
              return { val, rearr:"u = v_s*d*(1.5 + 2.68e-2*P*(Ts-Ta)/Ts*d) / dH", sub:"v_s="+fN(v.vs)+", d="+fN(v.d)+", P="+fN(v.P)+", Ts="+fN(v.Ts)+", Ta="+fN(v.Ta)+", dH="+fN(v.dH) };
            },
            "vs": v=>{
              const val=v.dH*v.u/(v.d*(1.5+2.68e-2*v.P*(v.Ts-v.Ta)/v.Ts*v.d));
              return { val, rearr:"v_s = dH*u / [d*(1.5 + 2.68e-2*P*(Ts-Ta)/Ts*d)]", sub:"dH="+fN(v.dH)+", u="+fN(v.u)+", d="+fN(v.d)+", P="+fN(v.P)+", Ts="+fN(v.Ts)+", Ta="+fN(v.Ta) };
            }
          }
        },

        // ── Effective stack height ───────────────────────────────
        {
          id:"eff_stack_h", name:"Effective Stack Height",
          formula:"H = h + dH",
          desc:"Physical stack height plus plume rise gives effective release height. (EQN 8-37)",
          ref:"EQN 8-37",
          vars:{
            "H":  { sym:"H",  desc:"Effective stack height", units:["m","ft"],toBase:[1,0.3048] },
            "h":  { sym:"h",  desc:"Physical stack height",  units:["m","ft"],toBase:[1,0.3048] },
            "dH": { sym:"dH", desc:"Plume rise",             units:["m","ft"],toBase:[1,0.3048] }
          },
          solvers:{
            "H":  v=>({ val:v.h+v.dH,  rearr:"H = h + dH",  sub:"h="+fN(v.h)+"m, dH="+fN(v.dH)+"m" }),
            "h":  v=>({ val:v.H-v.dH,  rearr:"h = H - dH",  sub:"H="+fN(v.H)+"m, dH="+fN(v.dH)+"m" }),
            "dH": v=>({ val:v.H-v.h,   rearr:"dH = H - h",  sub:"H="+fN(v.H)+"m, h="+fN(v.h)+"m" })
          }
        },

        // ── sigma_y ──────────────────────────────────────────────
        {
          id:"sigma_y", name:"Horizontal Dispersion Coefficient (sigma_y)",
          formula:"sigma_y = a * x^0.894",
          desc:"Pasquill-Gifford lateral plume spread. 'a' depends on stability class (from p.635-637). (EQN 8-23)",
          ref:"EQN 8-23",
          vars:{
            "sy":{ sym:"sigma_y", desc:"Horizontal dispersion coeff", units:["m"],             toBase:[1] },
            "a": { sym:"a",       desc:"Stability class coefficient",  units:["dimensionless"], toBase:[1] },
            "x": { sym:"x",       desc:"Downwind distance",            units:["km","m"],        toBase:[1,0.001] }
          },
          solvers:{
            "sy": v=>({ val:v.a*Math.pow(v.x,0.894),      rearr:"sigma_y = a * x^0.894",        sub:"a="+fN(v.a)+", x="+fN(v.x)+"km" }),
            "x":  v=>({ val:Math.pow(v.sy/v.a,1/0.894),   rearr:"x = (sigma_y/a)^(1/0.894)",    sub:"sigma_y="+fN(v.sy)+", a="+fN(v.a) }),
            "a":  v=>({ val:v.sy/Math.pow(v.x,0.894),     rearr:"a = sigma_y / x^0.894",        sub:"sigma_y="+fN(v.sy)+", x="+fN(v.x)+"km" })
          }
        },

        // ── sigma_z ──────────────────────────────────────────────
        {
          id:"sigma_z", name:"Vertical Dispersion Coefficient (sigma_z)",
          formula:"sigma_z = c * x^d + f",
          desc:"Pasquill-Gifford vertical plume spread. c, d, f from stability class table (p.635-637). (EQN 8-26)",
          ref:"EQN 8-26",
          vars:{
            "sz":{ sym:"sigma_z", desc:"Vertical dispersion coeff",  units:["m"],             toBase:[1] },
            "c": { sym:"c",       desc:"Stability class coeff c",    units:["dimensionless"], toBase:[1] },
            "x": { sym:"x",       desc:"Downwind distance",          units:["km","m"],        toBase:[1,0.001] },
            "dd":{ sym:"d",       desc:"Stability class coeff d",    units:["dimensionless"], toBase:[1] },
            "f": { sym:"f",       desc:"Stability class coeff f",    units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "sz": v=>({ val:v.c*Math.pow(v.x,v.dd)+v.f,             rearr:"sigma_z = c * x^d + f",               sub:"c="+fN(v.c)+", x="+fN(v.x)+"km, d="+fN(v.dd)+", f="+fN(v.f) }),
            "x":  v=>({ val:Math.pow((v.sz-v.f)/v.c,1/v.dd),        rearr:"x = ((sigma_z-f)/c)^(1/d)",           sub:"sigma_z="+fN(v.sz)+", c="+fN(v.c)+", f="+fN(v.f)+", d="+fN(v.dd) }),
            "c":  v=>({ val:(v.sz-v.f)/Math.pow(v.x,v.dd),          rearr:"c = (sigma_z-f) / x^d",               sub:"sigma_z="+fN(v.sz)+", x="+fN(v.x)+"km, d="+fN(v.dd)+", f="+fN(v.f) }),
            "f":  v=>({ val:v.sz-v.c*Math.pow(v.x,v.dd),            rearr:"f = sigma_z - c*x^d",                 sub:"sigma_z="+fN(v.sz)+", c="+fN(v.c)+", x="+fN(v.x)+"km, d="+fN(v.dd) })
          }
        },

        // ── Gaussian dispersion centerline ───────────────────────
        {
          id:"gauss_cl", name:"Gaussian Dispersion — Centerline, Ground-Level",
          formula:"chi = [E/(pi*sy*sz*u)] * exp[-H^2/(2*sz^2)]",
          desc:"Ground-level concentration along plume centerline (y=0, z=0). (EQN 8-36)",
          ref:"EQN 8-36",
          vars:{
            "chi": { sym:"chi",     desc:"Ground-level concentration",  units:["ug/m3","mg/m3"],    toBase:[1,1000] },
            "E":   { sym:"E",       desc:"Emission rate",               units:["g/s","kg/h","mg/s"],toBase:[1,0.27778,0.001] },
            "sigy":{ sym:"sigma_y", desc:"Horizontal dispersion coeff", units:["m"],               toBase:[1] },
            "sigz":{ sym:"sigma_z", desc:"Vertical dispersion coeff",   units:["m"],               toBase:[1] },
            "u":   { sym:"u",       desc:"Mean wind speed at stack",    units:["m/s","km/h"],       toBase:[1,0.27778] },
            "H":   { sym:"H",       desc:"Effective stack height",      units:["m","ft"],           toBase:[1,0.3048] }
          },
          solvers:{
            "chi": v=>{
              const val=(v.E*1e6)/(Math.PI*v.sigy*v.sigz*v.u)*Math.exp(-0.5*Math.pow(v.H/v.sigz,2));
              return { val, rearr:"chi [ug/m3] = (E*1e6)/(pi*sy*sz*u) * exp[-H^2/(2*sz^2)]", sub:"E="+fN(v.E)+"g/s, sy="+fN(v.sigy)+"m, sz="+fN(v.sigz)+"m, u="+fN(v.u)+"m/s, H="+fN(v.H)+"m" };
            },
            "E": v=>{
              const val=(v.chi/1e6)*Math.PI*v.sigy*v.sigz*v.u/Math.exp(-0.5*Math.pow(v.H/v.sigz,2));
              return { val, rearr:"E [g/s] = (chi/1e6)*pi*sy*sz*u / exp[-H^2/(2*sz^2)]", sub:"chi="+fN(v.chi)+"ug/m3, sy="+fN(v.sigy)+"m, sz="+fN(v.sigz)+"m, u="+fN(v.u)+"m/s, H="+fN(v.H)+"m" };
            },
            "u": v=>{
              const val=(v.E*1e6*Math.exp(-0.5*Math.pow(v.H/v.sigz,2)))/(Math.PI*v.sigy*v.sigz*v.chi);
              return { val, rearr:"u = E*1e6*exp[-H^2/(2*sz^2)] / (pi*sy*sz*chi)", sub:"E="+fN(v.E)+", sy="+fN(v.sigy)+", sz="+fN(v.sigz)+", chi="+fN(v.chi)+", H="+fN(v.H) };
            },
            "H": v=>{
              const ratio=v.chi*Math.PI*v.sigy*v.sigz*v.u/(v.E*1e6);
              const val=v.sigz*Math.sqrt(-2*Math.log(ratio));
              return { val, rearr:"H = sz*sqrt(-2*ln(chi*pi*sy*sz*u/(E*1e6)))", sub:"chi="+fN(v.chi)+", sy="+fN(v.sigy)+", sz="+fN(v.sigz)+", u="+fN(v.u)+", E="+fN(v.E) };
            },
            "sigy": v=>{
              const val=(v.E*1e6*Math.exp(-0.5*Math.pow(v.H/v.sigz,2)))/(Math.PI*v.sigz*v.u*v.chi);
              return { val, rearr:"sigma_y = E*1e6*exp[-H^2/(2*sz^2)] / (pi*sz*u*chi)", sub:"E="+fN(v.E)+", sz="+fN(v.sigz)+", u="+fN(v.u)+", chi="+fN(v.chi)+", H="+fN(v.H) };
            },
            "sigz": v=>{
              // Numerical note: sigma_z appears in two places so this requires iteration.
              // Approximation: solve ignoring H term first then refine.
              var sz=v.E*1e6/(Math.PI*v.sigy*v.u*v.chi);
              for(var i=0;i<20;i++){
                sz=(v.E*1e6/(Math.PI*v.sigy*v.u*v.chi))*Math.exp(-0.5*Math.pow(v.H/sz,2));
              }
              return { val:sz, rearr:"sigma_z solved iteratively from chi = (E*1e6)/(pi*sy*sz*u)*exp[-H^2/(2*sz^2)]", sub:"E="+fN(v.E)+", sy="+fN(v.sigy)+", u="+fN(v.u)+", chi="+fN(v.chi)+", H="+fN(v.H) };
            }
          }
        },

        // ── Air pollutant unit conversion ────────────────────────
        {
          id:"air_convert", name:"Air Pollutant Conversion (ppm to ug/m3)",
          formula:"C[ug/m3] = ppm * (MW/22.414) * (273.15/T) * (P/101.325) * 1e6",
          desc:"Convert gas concentration from ppm (v/v) to ug/m3 at temperature T and pressure P. (EQN 8-5)",
          ref:"EQN 8-5",
          vars:{
            "Cugm3":{ sym:"C[ug/m3]", desc:"Mass concentration",           units:["ug/m3","mg/m3"], toBase:[1,1000] },
            "Cppm": { sym:"C[ppm]",   desc:"Volume concentration",          units:["ppm"],           toBase:[1] },
            "MW":   { sym:"MW",        desc:"Molecular weight of pollutant", units:["g/mol"],         toBase:[1] },
            "T":    { sym:"T",         desc:"Air temperature",              units:["K"],             toBase:[1] },
            "Patm": { sym:"P",         desc:"Atmospheric pressure",         units:["kPa","atm"],     toBase:[1,101.325] }
          },
          solvers:{
            "Cugm3": v=>{
              const val=v.Cppm*(v.MW/22.414)*(273.15/v.T)*(v.Patm/101.325)*1e6;
              return { val, rearr:"C[ug/m3] = ppm*(MW/22.414)*(273.15/T)*(P/101.325)*1e6", sub:"ppm="+fN(v.Cppm)+", MW="+fN(v.MW)+", T="+fN(v.T)+"K, P="+fN(v.Patm)+"kPa" };
            },
            "Cppm": v=>{
              const val=v.Cugm3/((v.MW/22.414)*(273.15/v.T)*(v.Patm/101.325)*1e6);
              return { val, rearr:"ppm = C[ug/m3] / [(MW/22.414)*(273.15/T)*(P/101.325)*1e6]", sub:"C="+fN(v.Cugm3)+"ug/m3, MW="+fN(v.MW)+", T="+fN(v.T)+"K, P="+fN(v.Patm)+"kPa" };
            },
            "MW": v=>{
              const val=v.Cugm3*22.414/(v.Cppm*(273.15/v.T)*(v.Patm/101.325)*1e6);
              return { val, rearr:"MW = C[ug/m3]*22.414 / [ppm*(273.15/T)*(P/101.325)*1e6]", sub:"C="+fN(v.Cugm3)+", ppm="+fN(v.Cppm)+", T="+fN(v.T)+", P="+fN(v.Patm) };
            },
            "T": v=>{
              const val=273.15*v.Cppm*(v.MW/22.414)*(v.Patm/101.325)*1e6/v.Cugm3;
              return { val, rearr:"T = 273.15*ppm*(MW/22.414)*(P/101.325)*1e6 / C[ug/m3]", sub:"ppm="+fN(v.Cppm)+", MW="+fN(v.MW)+", P="+fN(v.Patm)+", C="+fN(v.Cugm3) };
            },
            "Patm": v=>{
              const val=101.325*v.Cugm3/(v.Cppm*(v.MW/22.414)*(273.15/v.T)*1e6);
              return { val, rearr:"P = 101.325*C[ug/m3] / [ppm*(MW/22.414)*(273.15/T)*1e6]", sub:"C="+fN(v.Cugm3)+", ppm="+fN(v.Cppm)+", MW="+fN(v.MW)+", T="+fN(v.T) };
            }
          }
        }

      ] // end air equations
    }

  ] // end tabs
}; // end COURSE_EV350

// ================================================================
// Helper — formats numbers cleanly for substitution strings
// ================================================================
function fN(n) {
  if (!isFinite(n)) return "?";
  if (n === 0) return "0";
  var a = Math.abs(n);
  return (a >= 0.001 && a < 1e7)
    ? parseFloat(n.toPrecision(5)).toString()
    : n.toExponential(3);
}