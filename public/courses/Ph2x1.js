// ================================================================
// PH2X1 — Physics (PH201/PH211)
// West Point — PH2X1 Physics Reference Card (17 JUN 2024)
// All 83 numbered equations organized by topic tab.
// To update: edit ONLY this file, then push to GitHub.
// ================================================================

window.COURSE_PH2X1 = {
  id:          "ph2x1",
  code:        "PH2X1",
  name:        "Physics",
  description: "Kinematics, Newton's laws, energy, momentum, oscillations, waves, gravitation",

  tabs: [

    // ═══════════════════════════════════════════════════════════════
    // TAB 1 — KINEMATICS
    // Translation, Rotation, and Link equations [1–13]
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "kinematics",
      title: "Kinematics",
      desc:  "Translational and rotational motion with constant acceleration; arc length and centripetal acceleration",
      equations: [

        // ── [1] Position with constant acceleration ───────────────
        {
          id:"kin1", name:"Position — Constant Acceleration [1]",
          formula:"x = x0 + v0x*t + (1/2)*ax*t^2",
          desc:"Position as a function of time under constant acceleration. (PRC Eq. 1)",
          ref:"PRC [1]",
          vars:{
            "x":  { sym:"x",   desc:"Final position",        units:["m","ft"], toBase:[1, 0.3048] },
            "x0": { sym:"x₀",  desc:"Initial position",      units:["m","ft"], toBase:[1, 0.3048] },
            "v0": { sym:"v₀ₓ", desc:"Initial velocity",      units:["m/s","ft/s"], toBase:[1, 0.3048] },
            "t":  { sym:"t",   desc:"Time",                   units:["s"],      toBase:[1] },
            "ax": { sym:"aₓ",  desc:"Acceleration",           units:["m/s2","ft/s2"], toBase:[1, 0.3048] }
          },
          solvers:{
            "x":  v=>({ val:v.x0+v.v0*v.t+0.5*v.ax*v.t*v.t,   rearr:"x = x₀ + v₀t + ½aₓt²",   sub:"x₀="+fN(v.x0)+", v₀="+fN(v.v0)+", t="+fN(v.t)+", a="+fN(v.ax) }),
            "t":  v=>({
              val:(function(){ var disc=v.v0*v.v0-2*v.ax*(v.x0-v.x); return disc>=0?(-v.v0+Math.sqrt(disc))/v.ax:NaN; })(),
              rearr:"t = [−v₀ + √(v₀²−2a(x₀−x))] / a  (positive root)",
              sub:"x="+fN(v.x)+", x₀="+fN(v.x0)+", v₀="+fN(v.v0)+", a="+fN(v.ax)
            }),
            "v0": v=>({ val:(v.x-v.x0-0.5*v.ax*v.t*v.t)/v.t,   rearr:"v₀ = (x−x₀ − ½at²) / t",   sub:"x="+fN(v.x)+", x₀="+fN(v.x0)+", t="+fN(v.t)+", a="+fN(v.ax) }),
            "ax": v=>({ val:2*(v.x-v.x0-v.v0*v.t)/(v.t*v.t),    rearr:"a = 2(x−x₀−v₀t) / t²",     sub:"x="+fN(v.x)+", x₀="+fN(v.x0)+", v₀="+fN(v.v0)+", t="+fN(v.t) }),
            "x0": v=>({ val:v.x-v.v0*v.t-0.5*v.ax*v.t*v.t,      rearr:"x₀ = x − v₀t − ½at²",      sub:"x="+fN(v.x)+", v₀="+fN(v.v0)+", t="+fN(v.t)+", a="+fN(v.ax) })
          }
        },

        // ── [2] Velocity with constant acceleration ───────────────
        {
          id:"kin2", name:"Velocity — Constant Acceleration [2]",
          formula:"vx = v0x + ax*t",
          desc:"Velocity as a function of time under constant acceleration. (PRC Eq. 2)",
          ref:"PRC [2]",
          vars:{
            "vx": { sym:"vₓ",  desc:"Final velocity",    units:["m/s","ft/s"],   toBase:[1, 0.3048] },
            "v0": { sym:"v₀ₓ", desc:"Initial velocity",  units:["m/s","ft/s"],   toBase:[1, 0.3048] },
            "ax": { sym:"aₓ",  desc:"Acceleration",       units:["m/s2","ft/s2"], toBase:[1, 0.3048] },
            "t":  { sym:"t",   desc:"Time",               units:["s"],             toBase:[1] }
          },
          solvers:{
            "vx": v=>({ val:v.v0+v.ax*v.t,        rearr:"vₓ = v₀ₓ + aₓt",        sub:"v₀="+fN(v.v0)+", a="+fN(v.ax)+", t="+fN(v.t) }),
            "v0": v=>({ val:v.vx-v.ax*v.t,         rearr:"v₀ₓ = vₓ − aₓt",        sub:"vₓ="+fN(v.vx)+", a="+fN(v.ax)+", t="+fN(v.t) }),
            "ax": v=>({ val:(v.vx-v.v0)/v.t,       rearr:"aₓ = (vₓ − v₀ₓ) / t",  sub:"vₓ="+fN(v.vx)+", v₀="+fN(v.v0)+", t="+fN(v.t) }),
            "t":  v=>({ val:(v.vx-v.v0)/v.ax,      rearr:"t = (vₓ − v₀ₓ) / aₓ",  sub:"vₓ="+fN(v.vx)+", v₀="+fN(v.v0)+", a="+fN(v.ax) })
          }
        },

        // ── [3] Velocity-position relation ───────────────────────
        {
          id:"kin3", name:"Velocity–Position (No Time) [3]",
          formula:"vx^2 = v0x^2 + 2*ax*(x - x0)",
          desc:"Relates velocity and position without time. (PRC Eq. 3)",
          ref:"PRC [3]",
          vars:{
            "vx": { sym:"vₓ",  desc:"Final velocity",    units:["m/s","ft/s"],   toBase:[1, 0.3048] },
            "v0": { sym:"v₀ₓ", desc:"Initial velocity",  units:["m/s","ft/s"],   toBase:[1, 0.3048] },
            "ax": { sym:"aₓ",  desc:"Acceleration",       units:["m/s2","ft/s2"], toBase:[1, 0.3048] },
            "x":  { sym:"x",   desc:"Final position",     units:["m","ft"],       toBase:[1, 0.3048] },
            "x0": { sym:"x₀",  desc:"Initial position",   units:["m","ft"],       toBase:[1, 0.3048] }
          },
          solvers:{
            "vx": v=>({ val:Math.sqrt(v.v0*v.v0+2*v.ax*(v.x-v.x0)),     rearr:"vₓ = √(v₀²+2a(x−x₀))",       sub:"v₀="+fN(v.v0)+", a="+fN(v.ax)+", Δx="+fN(v.x-v.x0) }),
            "v0": v=>({ val:Math.sqrt(v.vx*v.vx-2*v.ax*(v.x-v.x0)),     rearr:"v₀ = √(vₓ²−2a(x−x₀))",       sub:"vₓ="+fN(v.vx)+", a="+fN(v.ax)+", Δx="+fN(v.x-v.x0) }),
            "ax": v=>({ val:(v.vx*v.vx-v.v0*v.v0)/(2*(v.x-v.x0)),       rearr:"a = (vₓ²−v₀²) / 2(x−x₀)",    sub:"vₓ="+fN(v.vx)+", v₀="+fN(v.v0)+", Δx="+fN(v.x-v.x0) }),
            "x":  v=>({ val:v.x0+(v.vx*v.vx-v.v0*v.v0)/(2*v.ax),        rearr:"x = x₀ + (vₓ²−v₀²)/(2a)",   sub:"x₀="+fN(v.x0)+", vₓ="+fN(v.vx)+", v₀="+fN(v.v0)+", a="+fN(v.ax) })
          }
        },

        // ── [6] Arc length ────────────────────────────────────────
        {
          id:"kin6", name:"Arc Length [6]",
          formula:"s = theta * r",
          desc:"Arc length along a circular path. θ in radians. (PRC Eq. 6)",
          ref:"PRC [6]",
          vars:{
            "s":   { sym:"s",  desc:"Arc length",       units:["m","ft"],  toBase:[1, 0.3048] },
            "th":  { sym:"θ",  desc:"Angle",             units:["rad"],     toBase:[1] },
            "r":   { sym:"r",  desc:"Radius",            units:["m","ft"],  toBase:[1, 0.3048] }
          },
          solvers:{
            "s":  v=>({ val:v.th*v.r,    rearr:"s = θ × r",    sub:"θ="+fN(v.th)+"rad, r="+fN(v.r) }),
            "th": v=>({ val:v.s/v.r,     rearr:"θ = s / r",    sub:"s="+fN(v.s)+", r="+fN(v.r) }),
            "r":  v=>({ val:v.s/v.th,    rearr:"r = s / θ",    sub:"s="+fN(v.s)+", θ="+fN(v.th) })
          }
        },

        // ── [7] Tangential velocity ───────────────────────────────
        {
          id:"kin7", name:"Tangential Velocity [7]",
          formula:"vt = omega * r",
          desc:"Linear (tangential) speed from angular velocity. (PRC Eq. 7)",
          ref:"PRC [7]",
          vars:{
            "vt":  { sym:"vₜ",  desc:"Tangential velocity",  units:["m/s"],  toBase:[1] },
            "om":  { sym:"ω",   desc:"Angular velocity",      units:["rad/s"], toBase:[1] },
            "r":   { sym:"r",   desc:"Radius",                units:["m","ft"], toBase:[1, 0.3048] }
          },
          solvers:{
            "vt": v=>({ val:v.om*v.r,    rearr:"vₜ = ω × r",    sub:"ω="+fN(v.om)+", r="+fN(v.r) }),
            "om": v=>({ val:v.vt/v.r,    rearr:"ω = vₜ / r",    sub:"vₜ="+fN(v.vt)+", r="+fN(v.r) }),
            "r":  v=>({ val:v.vt/v.om,   rearr:"r = vₜ / ω",    sub:"vₜ="+fN(v.vt)+", ω="+fN(v.om) })
          }
        },

        // ── [8] Tangential acceleration ──────────────────────────
        {
          id:"kin8", name:"Tangential Acceleration [8]",
          formula:"at = alpha * r",
          desc:"Linear tangential acceleration from angular acceleration. (PRC Eq. 8)",
          ref:"PRC [8]",
          vars:{
            "at":  { sym:"aₜ",  desc:"Tangential acceleration",  units:["m/s2"],  toBase:[1] },
            "alp": { sym:"α",   desc:"Angular acceleration",      units:["rad/s2"], toBase:[1] },
            "r":   { sym:"r",   desc:"Radius",                    units:["m","ft"],  toBase:[1, 0.3048] }
          },
          solvers:{
            "at":  v=>({ val:v.alp*v.r,   rearr:"aₜ = α × r",   sub:"α="+fN(v.alp)+", r="+fN(v.r) }),
            "alp": v=>({ val:v.at/v.r,    rearr:"α = aₜ / r",   sub:"aₜ="+fN(v.at)+", r="+fN(v.r) }),
            "r":   v=>({ val:v.at/v.alp,  rearr:"r = aₜ / α",   sub:"aₜ="+fN(v.at)+", α="+fN(v.alp) })
          }
        },

        // ── [9] Rotational position ───────────────────────────────
        {
          id:"kin9", name:"Rotational Position — Constant α [9]",
          formula:"theta = theta0 + omega0*t + (1/2)*alpha*t^2",
          desc:"Angular position under constant angular acceleration. (PRC Eq. 9)",
          ref:"PRC [9]",
          vars:{
            "th":  { sym:"θ",   desc:"Final angle",              units:["rad"], toBase:[1] },
            "th0": { sym:"θ₀",  desc:"Initial angle",            units:["rad"], toBase:[1] },
            "om0": { sym:"ω₀",  desc:"Initial angular velocity", units:["rad/s"], toBase:[1] },
            "t":   { sym:"t",   desc:"Time",                     units:["s"],   toBase:[1] },
            "alp": { sym:"α",   desc:"Angular acceleration",     units:["rad/s2"], toBase:[1] }
          },
          solvers:{
            "th":  v=>({ val:v.th0+v.om0*v.t+0.5*v.alp*v.t*v.t,    rearr:"θ = θ₀ + ω₀t + ½αt²",    sub:"θ₀="+fN(v.th0)+", ω₀="+fN(v.om0)+", t="+fN(v.t)+", α="+fN(v.alp) }),
            "om0": v=>({ val:(v.th-v.th0-0.5*v.alp*v.t*v.t)/v.t,   rearr:"ω₀ = (θ−θ₀ − ½αt²) / t", sub:"θ="+fN(v.th)+", θ₀="+fN(v.th0)+", t="+fN(v.t)+", α="+fN(v.alp) }),
            "alp": v=>({ val:2*(v.th-v.th0-v.om0*v.t)/(v.t*v.t),   rearr:"α = 2(θ−θ₀−ω₀t) / t²",   sub:"θ="+fN(v.th)+", θ₀="+fN(v.th0)+", ω₀="+fN(v.om0)+", t="+fN(v.t) }),
            "t":   v=>({
              val:(function(){ var disc=v.om0*v.om0-2*v.alp*(v.th0-v.th); return disc>=0?(-v.om0+Math.sqrt(disc))/v.alp:NaN; })(),
              rearr:"t = [−ω₀+√(ω₀²−2α(θ₀−θ))]/α", sub:"θ="+fN(v.th)+", θ₀="+fN(v.th0)+", ω₀="+fN(v.om0)+", α="+fN(v.alp)
            })
          }
        },

        // ── [10] Angular velocity ─────────────────────────────────
        {
          id:"kin10", name:"Angular Velocity — Constant α [10]",
          formula:"omega = omega0 + alpha*t",
          desc:"Angular velocity under constant angular acceleration. (PRC Eq. 10)",
          ref:"PRC [10]",
          vars:{
            "om":  { sym:"ω",  desc:"Final angular velocity",   units:["rad/s"],  toBase:[1] },
            "om0": { sym:"ω₀", desc:"Initial angular velocity", units:["rad/s"],  toBase:[1] },
            "alp": { sym:"α",  desc:"Angular acceleration",     units:["rad/s2"], toBase:[1] },
            "t":   { sym:"t",  desc:"Time",                     units:["s"],      toBase:[1] }
          },
          solvers:{
            "om":  v=>({ val:v.om0+v.alp*v.t,         rearr:"ω = ω₀ + αt",          sub:"ω₀="+fN(v.om0)+", α="+fN(v.alp)+", t="+fN(v.t) }),
            "om0": v=>({ val:v.om-v.alp*v.t,           rearr:"ω₀ = ω − αt",          sub:"ω="+fN(v.om)+", α="+fN(v.alp)+", t="+fN(v.t) }),
            "alp": v=>({ val:(v.om-v.om0)/v.t,         rearr:"α = (ω − ω₀) / t",     sub:"ω="+fN(v.om)+", ω₀="+fN(v.om0)+", t="+fN(v.t) }),
            "t":   v=>({ val:(v.om-v.om0)/v.alp,       rearr:"t = (ω − ω₀) / α",     sub:"ω="+fN(v.om)+", ω₀="+fN(v.om0)+", α="+fN(v.alp) })
          }
        },

        // ── [11] Angular velocity–position ───────────────────────
        {
          id:"kin11", name:"Angular Velocity–Position (No Time) [11]",
          formula:"omega^2 = omega0^2 + 2*alpha*(theta - theta0)",
          desc:"Relates angular velocity and angle without time. (PRC Eq. 11)",
          ref:"PRC [11]",
          vars:{
            "om":  { sym:"ω",  desc:"Final angular velocity",   units:["rad/s"],  toBase:[1] },
            "om0": { sym:"ω₀", desc:"Initial angular velocity", units:["rad/s"],  toBase:[1] },
            "alp": { sym:"α",  desc:"Angular acceleration",     units:["rad/s2"], toBase:[1] },
            "th":  { sym:"θ",  desc:"Final angle",              units:["rad"],    toBase:[1] },
            "th0": { sym:"θ₀", desc:"Initial angle",            units:["rad"],    toBase:[1] }
          },
          solvers:{
            "om":  v=>({ val:Math.sqrt(v.om0*v.om0+2*v.alp*(v.th-v.th0)),     rearr:"ω = √(ω₀²+2α(θ−θ₀))",       sub:"ω₀="+fN(v.om0)+", α="+fN(v.alp)+", Δθ="+fN(v.th-v.th0) }),
            "om0": v=>({ val:Math.sqrt(v.om*v.om-2*v.alp*(v.th-v.th0)),       rearr:"ω₀ = √(ω²−2α(θ−θ₀))",       sub:"ω="+fN(v.om)+", α="+fN(v.alp)+", Δθ="+fN(v.th-v.th0) }),
            "alp": v=>({ val:(v.om*v.om-v.om0*v.om0)/(2*(v.th-v.th0)),        rearr:"α = (ω²−ω₀²) / 2(θ−θ₀)",    sub:"ω="+fN(v.om)+", ω₀="+fN(v.om0)+", Δθ="+fN(v.th-v.th0) }),
            "th":  v=>({ val:v.th0+(v.om*v.om-v.om0*v.om0)/(2*v.alp),         rearr:"θ = θ₀ + (ω²−ω₀²)/(2α)",    sub:"θ₀="+fN(v.th0)+", ω="+fN(v.om)+", ω₀="+fN(v.om0)+", α="+fN(v.alp) })
          }
        },

        // ── [12] Centripetal acceleration ────────────────────────
        {
          id:"kin12", name:"Centripetal Acceleration [12]",
          formula:"ac = v^2 / r",
          desc:"Acceleration directed toward center of circular path. (PRC Eq. 12)",
          ref:"PRC [12]",
          vars:{
            "ac": { sym:"aᶜ", desc:"Centripetal acceleration",  units:["m/s2"],   toBase:[1] },
            "v":  { sym:"v",  desc:"Speed",                      units:["m/s"],    toBase:[1] },
            "r":  { sym:"r",  desc:"Radius of circular path",    units:["m","ft"], toBase:[1, 0.3048] }
          },
          solvers:{
            "ac": v=>({ val:v.v*v.v/v.r,         rearr:"aᶜ = v² / r",      sub:"v="+fN(v.v)+", r="+fN(v.r) }),
            "v":  v=>({ val:Math.sqrt(v.ac*v.r),  rearr:"v = √(aᶜ × r)",   sub:"aᶜ="+fN(v.ac)+", r="+fN(v.r) }),
            "r":  v=>({ val:v.v*v.v/v.ac,         rearr:"r = v² / aᶜ",      sub:"v="+fN(v.v)+", aᶜ="+fN(v.ac) })
          }
        },

        // ── [13] Period of circular motion ───────────────────────
        {
          id:"kin13", name:"Period of Circular Motion [13]",
          formula:"T = 2*pi*r / v",
          desc:"Time for one complete revolution. (PRC Eq. 13)",
          ref:"PRC [13]",
          vars:{
            "T": { sym:"T",  desc:"Period",   units:["s"],      toBase:[1] },
            "r": { sym:"r",  desc:"Radius",   units:["m","ft"], toBase:[1, 0.3048] },
            "v": { sym:"v",  desc:"Speed",    units:["m/s"],    toBase:[1] }
          },
          solvers:{
            "T": v=>({ val:2*Math.PI*v.r/v.v,   rearr:"T = 2πr / v",   sub:"r="+fN(v.r)+", v="+fN(v.v) }),
            "r": v=>({ val:v.T*v.v/(2*Math.PI),  rearr:"r = Tv / 2π",   sub:"T="+fN(v.T)+", v="+fN(v.v) }),
            "v": v=>({ val:2*Math.PI*v.r/v.T,    rearr:"v = 2πr / T",   sub:"r="+fN(v.r)+", T="+fN(v.T) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 2 — NEWTON'S LAWS
    // Translation + Rotation [14–26]
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "newtons_laws",
      title: "Newton's Laws",
      desc:  "Net force, Newton's 2nd law, friction, drag, springs, torque, moment of inertia, parallel axis theorem",
      equations: [

        // ── [15] Newton's 2nd Law ─────────────────────────────────
        {
          id:"nl15", name:"Newton's 2nd Law — Translation [15]",
          formula:"F_net = m * a",
          desc:"Sum of external forces equals mass times acceleration. (PRC Eq. 15)",
          ref:"PRC [15]",
          vars:{
            "F": { sym:"ΣF",  desc:"Net force",      units:["N","lb"],   toBase:[1, 4.44822] },
            "m": { sym:"m",   desc:"Mass",            units:["kg","slug"], toBase:[1, 14.5939] },
            "a": { sym:"a",   desc:"Acceleration",    units:["m/s2","ft/s2"], toBase:[1, 0.3048] }
          },
          solvers:{
            "F": v=>({ val:v.m*v.a,   rearr:"ΣF = m × a",   sub:"m="+fN(v.m)+", a="+fN(v.a) }),
            "m": v=>({ val:v.F/v.a,   rearr:"m = ΣF / a",   sub:"ΣF="+fN(v.F)+", a="+fN(v.a) }),
            "a": v=>({ val:v.F/v.m,   rearr:"a = ΣF / m",   sub:"ΣF="+fN(v.F)+", m="+fN(v.m) })
          }
        },

        // ── [17] Static friction ──────────────────────────────────
        {
          id:"nl17", name:"Static Friction — Maximum [17]",
          formula:"fs_max = mu_s * N",
          desc:"Maximum static friction force before sliding begins. (PRC Eq. 17)",
          ref:"PRC [17]",
          vars:{
            "fs": { sym:"fₛ",  desc:"Max static friction",  units:["N","lb"], toBase:[1, 4.44822] },
            "us": { sym:"μₛ",  desc:"Coefficient of static friction", units:["dimensionless"], toBase:[1] },
            "N":  { sym:"N",   desc:"Normal force",          units:["N","lb"], toBase:[1, 4.44822] }
          },
          solvers:{
            "fs": v=>({ val:v.us*v.N,   rearr:"fₛ = μₛ × N",   sub:"μₛ="+fN(v.us)+", N="+fN(v.N) }),
            "us": v=>({ val:v.fs/v.N,   rearr:"μₛ = fₛ / N",   sub:"fₛ="+fN(v.fs)+", N="+fN(v.N) }),
            "N":  v=>({ val:v.fs/v.us,  rearr:"N = fₛ / μₛ",   sub:"fₛ="+fN(v.fs)+", μₛ="+fN(v.us) })
          }
        },

        // ── [18] Kinetic friction ─────────────────────────────────
        {
          id:"nl18", name:"Kinetic Friction [18]",
          formula:"fk = mu_k * N",
          desc:"Kinetic friction force while object is sliding. (PRC Eq. 18)",
          ref:"PRC [18]",
          vars:{
            "fk": { sym:"fₖ",  desc:"Kinetic friction force",  units:["N","lb"], toBase:[1, 4.44822] },
            "uk": { sym:"μₖ",  desc:"Coefficient of kinetic friction", units:["dimensionless"], toBase:[1] },
            "N":  { sym:"N",   desc:"Normal force",             units:["N","lb"], toBase:[1, 4.44822] }
          },
          solvers:{
            "fk": v=>({ val:v.uk*v.N,   rearr:"fₖ = μₖ × N",   sub:"μₖ="+fN(v.uk)+", N="+fN(v.N) }),
            "uk": v=>({ val:v.fk/v.N,   rearr:"μₖ = fₖ / N",   sub:"fₖ="+fN(v.fk)+", N="+fN(v.N) }),
            "N":  v=>({ val:v.fk/v.uk,  rearr:"N = fₖ / μₖ",   sub:"fₖ="+fN(v.fk)+", μₖ="+fN(v.uk) })
          }
        },

        // ── [19] Drag force ───────────────────────────────────────
        {
          id:"nl19", name:"Drag Force [19]",
          formula:"FD = (1/2) * C * rho * A * v^2",
          desc:"Drag force on object moving through a fluid. C = drag coefficient, ρ = fluid density. (PRC Eq. 19)",
          ref:"PRC [19]",
          vars:{
            "FD":  { sym:"F_D", desc:"Drag force",          units:["N","lb"],   toBase:[1, 4.44822] },
            "C":   { sym:"C",   desc:"Drag coefficient",    units:["dimensionless"], toBase:[1] },
            "rho": { sym:"ρ",   desc:"Fluid density",       units:["kg/m3"],    toBase:[1] },
            "A":   { sym:"A",   desc:"Cross-sectional area", units:["m2","ft2"], toBase:[1, 0.0929] },
            "v":   { sym:"v",   desc:"Speed",               units:["m/s","ft/s"], toBase:[1, 0.3048] }
          },
          solvers:{
            "FD":  v=>({ val:0.5*v.C*v.rho*v.A*v.v*v.v,           rearr:"F_D = ½CρAv²",          sub:"C="+fN(v.C)+", ρ="+fN(v.rho)+", A="+fN(v.A)+", v="+fN(v.v) }),
            "v":   v=>({ val:Math.sqrt(2*v.FD/(v.C*v.rho*v.A)),    rearr:"v = √(2F_D/(CρA))",     sub:"F_D="+fN(v.FD)+", C="+fN(v.C)+", ρ="+fN(v.rho)+", A="+fN(v.A) }),
            "A":   v=>({ val:2*v.FD/(v.C*v.rho*v.v*v.v),           rearr:"A = 2F_D / (Cρv²)",     sub:"F_D="+fN(v.FD)+", C="+fN(v.C)+", ρ="+fN(v.rho)+", v="+fN(v.v) }),
            "rho": v=>({ val:2*v.FD/(v.C*v.A*v.v*v.v),             rearr:"ρ = 2F_D / (CAv²)",     sub:"F_D="+fN(v.FD)+", C="+fN(v.C)+", A="+fN(v.A)+", v="+fN(v.v) })
          }
        },

        // ── [20] Spring force ─────────────────────────────────────
        {
          id:"nl20", name:"Spring Force (Hooke's Law) [20]",
          formula:"Fs = -k * x",
          desc:"Restoring force of a spring. k = spring constant, x = displacement from equilibrium. (PRC Eq. 20)",
          ref:"PRC [20]",
          vars:{
            "Fs": { sym:"Fₛ", desc:"Spring force (magnitude)",  units:["N","lb"],  toBase:[1, 4.44822] },
            "k":  { sym:"k",  desc:"Spring constant",            units:["N/m","lb/ft"], toBase:[1, 14.5939] },
            "x":  { sym:"x",  desc:"Displacement from equilibrium", units:["m","ft","cm"], toBase:[1, 0.3048, 0.01] }
          },
          solvers:{
            "Fs": v=>({ val:v.k*v.x,    rearr:"|Fₛ| = k × x",    sub:"k="+fN(v.k)+", x="+fN(v.x) }),
            "k":  v=>({ val:v.Fs/v.x,   rearr:"k = |Fₛ| / x",    sub:"Fₛ="+fN(v.Fs)+", x="+fN(v.x) }),
            "x":  v=>({ val:v.Fs/v.k,   rearr:"x = |Fₛ| / k",    sub:"Fₛ="+fN(v.Fs)+", k="+fN(v.k) })
          }
        },

        // ── [22] Newton's 2nd Law — Rotation ─────────────────────
        {
          id:"nl22", name:"Newton's 2nd Law — Rotation [22]",
          formula:"tau_net = I * alpha",
          desc:"Net torque equals moment of inertia times angular acceleration. (PRC Eq. 22)",
          ref:"PRC [22]",
          vars:{
            "tau": { sym:"Στ",  desc:"Net torque",             units:["N·m","lb·ft"], toBase:[1, 1.35582] },
            "I":   { sym:"I",   desc:"Moment of inertia",      units:["kg·m2"],       toBase:[1] },
            "alp": { sym:"α",   desc:"Angular acceleration",   units:["rad/s2"],      toBase:[1] }
          },
          solvers:{
            "tau": v=>({ val:v.I*v.alp,   rearr:"Στ = I × α",   sub:"I="+fN(v.I)+", α="+fN(v.alp) }),
            "I":   v=>({ val:v.tau/v.alp, rearr:"I = Στ / α",   sub:"Στ="+fN(v.tau)+", α="+fN(v.alp) }),
            "alp": v=>({ val:v.tau/v.I,   rearr:"α = Στ / I",   sub:"Στ="+fN(v.tau)+", I="+fN(v.I) })
          }
        },

        // ── [23] Torque ───────────────────────────────────────────
        {
          id:"nl23", name:"Torque [23]",
          formula:"tau = r * F * sin(theta)",
          desc:"Torque = r × F (cross product magnitude). θ = angle between r and F. (PRC Eq. 23)",
          ref:"PRC [23]",
          vars:{
            "tau": { sym:"τ",  desc:"Torque",                 units:["N·m","lb·ft"], toBase:[1, 1.35582] },
            "r":   { sym:"r",  desc:"Moment arm distance",    units:["m","ft"],       toBase:[1, 0.3048] },
            "F":   { sym:"F",  desc:"Applied force",          units:["N","lb"],       toBase:[1, 4.44822] },
            "th":  { sym:"θ",  desc:"Angle between r and F",  units:["deg"],          toBase:[1] }
          },
          solvers:{
            "tau": v=>({ val:v.r*v.F*Math.sin(v.th*Math.PI/180),                   rearr:"τ = r × F × sin(θ)",       sub:"r="+fN(v.r)+", F="+fN(v.F)+", θ="+fN(v.th)+"°" }),
            "F":   v=>({ val:v.tau/(v.r*Math.sin(v.th*Math.PI/180)),                rearr:"F = τ / (r×sin θ)",        sub:"τ="+fN(v.tau)+", r="+fN(v.r)+", θ="+fN(v.th)+"°" }),
            "r":   v=>({ val:v.tau/(v.F*Math.sin(v.th*Math.PI/180)),                rearr:"r = τ / (F×sin θ)",        sub:"τ="+fN(v.tau)+", F="+fN(v.F)+", θ="+fN(v.th)+"°" }),
            "th":  v=>({ val:Math.asin(v.tau/(v.r*v.F))*180/Math.PI,               rearr:"θ = arcsin(τ / (r×F))",    sub:"τ="+fN(v.tau)+", r="+fN(v.r)+", F="+fN(v.F) })
          }
        },

        // ── [26] Parallel Axis Theorem ────────────────────────────
        {
          id:"nl26", name:"Parallel Axis Theorem [26]",
          formula:"I_PA = I_com + m * d^2",
          desc:"Moment of inertia about any parallel axis = I_com + md². (PRC Eq. 26)",
          ref:"PRC [26]",
          vars:{
            "IPA":  { sym:"I_PA",  desc:"Moment of inertia about new axis", units:["kg·m2"], toBase:[1] },
            "Icom": { sym:"I_com", desc:"Moment of inertia about COM axis", units:["kg·m2"], toBase:[1] },
            "m":    { sym:"m",     desc:"Mass",                              units:["kg"],    toBase:[1] },
            "d":    { sym:"d",     desc:"Distance between axes",             units:["m","ft"], toBase:[1, 0.3048] }
          },
          solvers:{
            "IPA":  v=>({ val:v.Icom+v.m*v.d*v.d,   rearr:"I_PA = I_com + md²",   sub:"I_com="+fN(v.Icom)+", m="+fN(v.m)+", d="+fN(v.d) }),
            "Icom": v=>({ val:v.IPA-v.m*v.d*v.d,    rearr:"I_com = I_PA − md²",   sub:"I_PA="+fN(v.IPA)+", m="+fN(v.m)+", d="+fN(v.d) }),
            "m":    v=>({ val:(v.IPA-v.Icom)/(v.d*v.d), rearr:"m = (I_PA−I_com)/d²", sub:"I_PA="+fN(v.IPA)+", I_com="+fN(v.Icom)+", d="+fN(v.d) }),
            "d":    v=>({ val:Math.sqrt((v.IPA-v.Icom)/v.m), rearr:"d = √((I_PA−I_com)/m)", sub:"I_PA="+fN(v.IPA)+", I_com="+fN(v.Icom)+", m="+fN(v.m) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 3 — ENERGY & WORK
    // KE, PE, work, power [27–37]
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "energy",
      title: "Energy & Work",
      desc:  "Kinetic energy (translation & rotation), potential energy, work, power, conservative forces",
      equations: [

        // ── [27] Translational KE ─────────────────────────────────
        {
          id:"en27", name:"Translational Kinetic Energy [27]",
          formula:"KT = (1/2) * m * v^2",
          desc:"Kinetic energy of a translating object. (PRC Eq. 27)",
          ref:"PRC [27]",
          vars:{
            "KT": { sym:"K_T", desc:"Translational KE",  units:["J","kJ"],  toBase:[1, 1000] },
            "m":  { sym:"m",   desc:"Mass",               units:["kg","slug"], toBase:[1, 14.5939] },
            "v":  { sym:"v",   desc:"Speed",              units:["m/s","ft/s"], toBase:[1, 0.3048] }
          },
          solvers:{
            "KT": v=>({ val:0.5*v.m*v.v*v.v,           rearr:"K_T = ½mv²",      sub:"m="+fN(v.m)+", v="+fN(v.v) }),
            "v":  v=>({ val:Math.sqrt(2*v.KT/v.m),     rearr:"v = √(2K_T/m)",   sub:"K_T="+fN(v.KT)+", m="+fN(v.m) }),
            "m":  v=>({ val:2*v.KT/(v.v*v.v),          rearr:"m = 2K_T / v²",   sub:"K_T="+fN(v.KT)+", v="+fN(v.v) })
          }
        },

        // ── [28] Rotational KE ────────────────────────────────────
        {
          id:"en28", name:"Rotational Kinetic Energy [28]",
          formula:"KR = (1/2) * I * omega^2",
          desc:"Kinetic energy of a rotating object. (PRC Eq. 28)",
          ref:"PRC [28]",
          vars:{
            "KR": { sym:"K_R", desc:"Rotational KE",      units:["J","kJ"],  toBase:[1, 1000] },
            "I":  { sym:"I",   desc:"Moment of inertia",  units:["kg·m2"],   toBase:[1] },
            "om": { sym:"ω",   desc:"Angular velocity",   units:["rad/s"],   toBase:[1] }
          },
          solvers:{
            "KR": v=>({ val:0.5*v.I*v.om*v.om,           rearr:"K_R = ½Iω²",      sub:"I="+fN(v.I)+", ω="+fN(v.om) }),
            "om": v=>({ val:Math.sqrt(2*v.KR/v.I),       rearr:"ω = √(2K_R/I)",   sub:"K_R="+fN(v.KR)+", I="+fN(v.I) }),
            "I":  v=>({ val:2*v.KR/(v.om*v.om),          rearr:"I = 2K_R / ω²",   sub:"K_R="+fN(v.KR)+", ω="+fN(v.om) })
          }
        },

        // ── [29] Gravitational PE ─────────────────────────────────
        {
          id:"en29", name:"Gravitational Potential Energy [29]",
          formula:"Ug = m * g * y",
          desc:"Gravitational PE near Earth's surface. g = 9.807 m/s². y measured from reference. (PRC Eq. 29)",
          ref:"PRC [29]",
          vars:{
            "Ug": { sym:"U_g", desc:"Gravitational PE",  units:["J","kJ"],     toBase:[1, 1000] },
            "m":  { sym:"m",   desc:"Mass",               units:["kg","slug"],  toBase:[1, 14.5939] },
            "g":  { sym:"g",   desc:"Gravitational accel", units:["m/s2","ft/s2"], toBase:[1, 0.3048] },
            "y":  { sym:"y",   desc:"Height",              units:["m","ft"],     toBase:[1, 0.3048] }
          },
          solvers:{
            "Ug": v=>({ val:v.m*v.g*v.y,   rearr:"U_g = mgy",        sub:"m="+fN(v.m)+", g="+fN(v.g)+", y="+fN(v.y) }),
            "m":  v=>({ val:v.Ug/(v.g*v.y), rearr:"m = U_g / (gy)",  sub:"U_g="+fN(v.Ug)+", g="+fN(v.g)+", y="+fN(v.y) }),
            "y":  v=>({ val:v.Ug/(v.m*v.g), rearr:"y = U_g / (mg)",  sub:"U_g="+fN(v.Ug)+", m="+fN(v.m)+", g="+fN(v.g) }),
            "g":  v=>({ val:v.Ug/(v.m*v.y), rearr:"g = U_g / (my)",  sub:"U_g="+fN(v.Ug)+", m="+fN(v.m)+", y="+fN(v.y) })
          }
        },

        // ── [30] Spring PE ────────────────────────────────────────
        {
          id:"en30", name:"Elastic (Spring) Potential Energy [30]",
          formula:"Us = (1/2) * k * x^2",
          desc:"Potential energy stored in a spring displaced by x from equilibrium. (PRC Eq. 30)",
          ref:"PRC [30]",
          vars:{
            "Us": { sym:"U_s", desc:"Spring PE",           units:["J","kJ"],      toBase:[1, 1000] },
            "k":  { sym:"k",   desc:"Spring constant",     units:["N/m","lb/ft"], toBase:[1, 14.5939] },
            "x":  { sym:"x",   desc:"Displacement",        units:["m","cm","ft"], toBase:[1, 0.01, 0.3048] }
          },
          solvers:{
            "Us": v=>({ val:0.5*v.k*v.x*v.x,          rearr:"U_s = ½kx²",      sub:"k="+fN(v.k)+", x="+fN(v.x) }),
            "x":  v=>({ val:Math.sqrt(2*v.Us/v.k),    rearr:"x = √(2U_s/k)",   sub:"U_s="+fN(v.Us)+", k="+fN(v.k) }),
            "k":  v=>({ val:2*v.Us/(v.x*v.x),         rearr:"k = 2U_s / x²",   sub:"U_s="+fN(v.Us)+", x="+fN(v.x) })
          }
        },

        // ── [31] Non-conservative work ────────────────────────────
        {
          id:"en31", name:"Work by Non-Conservative Forces [31]",
          formula:"W_nc = Ef - E0",
          desc:"Work done by non-conservative forces (friction, etc.) equals change in total mechanical energy. (PRC Eq. 31)",
          ref:"PRC [31]",
          vars:{
            "Wnc": { sym:"W_nc", desc:"Work by non-conservative forces", units:["J","kJ"], toBase:[1, 1000] },
            "Ef":  { sym:"E_f",  desc:"Final total mechanical energy",   units:["J","kJ"], toBase:[1, 1000] },
            "E0":  { sym:"E₀",   desc:"Initial total mechanical energy", units:["J","kJ"], toBase:[1, 1000] }
          },
          solvers:{
            "Wnc": v=>({ val:v.Ef-v.E0,    rearr:"W_nc = E_f − E₀",    sub:"E_f="+fN(v.Ef)+", E₀="+fN(v.E0) }),
            "Ef":  v=>({ val:v.Wnc+v.E0,   rearr:"E_f = W_nc + E₀",    sub:"W_nc="+fN(v.Wnc)+", E₀="+fN(v.E0) }),
            "E0":  v=>({ val:v.Ef-v.Wnc,   rearr:"E₀ = E_f − W_nc",    sub:"E_f="+fN(v.Ef)+", W_nc="+fN(v.Wnc) })
          }
        },

        // ── [34] Work (dot product) ───────────────────────────────
        {
          id:"en34", name:"Work — Constant Force [34]",
          formula:"W = F * d * cos(theta)",
          desc:"Work done by a constant force. θ = angle between force and displacement. (PRC Eq. 34)",
          ref:"PRC [34]",
          vars:{
            "W":  { sym:"W",  desc:"Work",          units:["J","kJ"],  toBase:[1, 1000] },
            "F":  { sym:"F",  desc:"Force magnitude", units:["N","lb"], toBase:[1, 4.44822] },
            "d":  { sym:"d",  desc:"Displacement magnitude", units:["m","ft"], toBase:[1, 0.3048] },
            "th": { sym:"θ",  desc:"Angle between F and d",  units:["deg"],    toBase:[1] }
          },
          solvers:{
            "W":  v=>({ val:v.F*v.d*Math.cos(v.th*Math.PI/180),            rearr:"W = F·d·cos θ",        sub:"F="+fN(v.F)+", d="+fN(v.d)+", θ="+fN(v.th)+"°" }),
            "F":  v=>({ val:v.W/(v.d*Math.cos(v.th*Math.PI/180)),          rearr:"F = W / (d·cos θ)",    sub:"W="+fN(v.W)+", d="+fN(v.d)+", θ="+fN(v.th)+"°" }),
            "d":  v=>({ val:v.W/(v.F*Math.cos(v.th*Math.PI/180)),          rearr:"d = W / (F·cos θ)",    sub:"W="+fN(v.W)+", F="+fN(v.F)+", θ="+fN(v.th)+"°" }),
            "th": v=>({ val:Math.acos(v.W/(v.F*v.d))*180/Math.PI,          rearr:"θ = arccos(W/(Fd))",   sub:"W="+fN(v.W)+", F="+fN(v.F)+", d="+fN(v.d) })
          }
        },

        // ── [37] Power ────────────────────────────────────────────
        {
          id:"en37", name:"Power [37]",
          formula:"P = dW/dt = F * v * cos(theta)",
          desc:"Rate of energy transfer. Average power = W/t. Instantaneous = F·v·cos θ. (PRC Eq. 37)",
          ref:"PRC [37]",
          vars:{
            "P":  { sym:"P",  desc:"Power",       units:["W","kW","hp"],   toBase:[1, 1000, 745.7] },
            "W":  { sym:"W",  desc:"Work",         units:["J","kJ"],        toBase:[1, 1000] },
            "t":  { sym:"t",  desc:"Time interval", units:["s","min"],       toBase:[1, 60] }
          },
          solvers:{
            "P": v=>({ val:v.W/v.t,    rearr:"P = W / t",    sub:"W="+fN(v.W)+", t="+fN(v.t) }),
            "W": v=>({ val:v.P*v.t,    rearr:"W = P × t",    sub:"P="+fN(v.P)+", t="+fN(v.t) }),
            "t": v=>({ val:v.W/v.P,    rearr:"t = W / P",    sub:"W="+fN(v.W)+", P="+fN(v.P) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 4 — MOMENTUM
    // Linear and Angular [38–49]
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "momentum",
      title: "Momentum",
      desc:  "Linear momentum, impulse, conservation; angular momentum and conservation",
      equations: [

        // ── [38] Linear momentum ──────────────────────────────────
        {
          id:"mom38", name:"Linear Momentum [38]",
          formula:"p = m * v",
          desc:"Linear momentum of a particle. (PRC Eq. 38)",
          ref:"PRC [38]",
          vars:{
            "p": { sym:"p",  desc:"Linear momentum",  units:["kg·m/s","slug·ft/s"], toBase:[1, 4.44822] },
            "m": { sym:"m",  desc:"Mass",              units:["kg","slug"],           toBase:[1, 14.5939] },
            "v": { sym:"v",  desc:"Velocity",          units:["m/s","ft/s"],          toBase:[1, 0.3048] }
          },
          solvers:{
            "p": v=>({ val:v.m*v.v,   rearr:"p = mv",    sub:"m="+fN(v.m)+", v="+fN(v.v) }),
            "m": v=>({ val:v.p/v.v,   rearr:"m = p/v",   sub:"p="+fN(v.p)+", v="+fN(v.v) }),
            "v": v=>({ val:v.p/v.m,   rearr:"v = p/m",   sub:"p="+fN(v.p)+", m="+fN(v.m) })
          }
        },

        // ── [39/40] Impulse ───────────────────────────────────────
        {
          id:"mom39", name:"Impulse [39/40]",
          formula:"J = delta_p = F_avg * delta_t",
          desc:"Impulse equals change in momentum. Also J = F_avg × Δt. (PRC Eq. 39, 40)",
          ref:"PRC [39][40]",
          vars:{
            "J":  { sym:"J",     desc:"Impulse",             units:["N·s","lb·s"],   toBase:[1, 4.44822] },
            "Favg":{ sym:"F_avg", desc:"Average force",      units:["N","lb"],        toBase:[1, 4.44822] },
            "dt": { sym:"Δt",    desc:"Time interval",       units:["s","ms"],        toBase:[1, 0.001] },
            "dp": { sym:"Δp",    desc:"Change in momentum",  units:["kg·m/s"],        toBase:[1] }
          },
          solvers:{
            "J":    v=>({ val:v.Favg*v.dt,    rearr:"J = F_avg × Δt",   sub:"F_avg="+fN(v.Favg)+", Δt="+fN(v.dt) }),
            "Favg": v=>({ val:v.J/v.dt,       rearr:"F_avg = J / Δt",   sub:"J="+fN(v.J)+", Δt="+fN(v.dt) }),
            "dt":   v=>({ val:v.J/v.Favg,     rearr:"Δt = J / F_avg",   sub:"J="+fN(v.J)+", F_avg="+fN(v.Favg) }),
            "dp":   v=>({ val:v.J,             rearr:"Δp = J",           sub:"J="+fN(v.J) })
          }
        },

        // ── [46] Angular momentum ─────────────────────────────────
        {
          id:"mom46", name:"Angular Momentum [46]",
          formula:"L = I * omega",
          desc:"Angular momentum of a rigid body. (PRC Eq. 46)",
          ref:"PRC [46]",
          vars:{
            "L":  { sym:"L",  desc:"Angular momentum",    units:["kg·m2/s"], toBase:[1] },
            "I":  { sym:"I",  desc:"Moment of inertia",   units:["kg·m2"],   toBase:[1] },
            "om": { sym:"ω",  desc:"Angular velocity",    units:["rad/s"],   toBase:[1] }
          },
          solvers:{
            "L":  v=>({ val:v.I*v.om,   rearr:"L = Iω",    sub:"I="+fN(v.I)+", ω="+fN(v.om) }),
            "I":  v=>({ val:v.L/v.om,   rearr:"I = L/ω",   sub:"L="+fN(v.L)+", ω="+fN(v.om) }),
            "om": v=>({ val:v.L/v.I,    rearr:"ω = L/I",   sub:"L="+fN(v.L)+", I="+fN(v.I) })
          }
        },

        // ── [44/49] Conservation of momentum ─────────────────────
        {
          id:"mom44", name:"Conservation of Momentum [44/49]",
          formula:"p_total_i = p_total_f  (when F_ext = 0)",
          desc:"If net external force is zero, total linear momentum is conserved. For 2 objects: m1v1i + m2v2i = m1v1f + m2v2f. (PRC Eq. 44)",
          ref:"PRC [44]",
          vars:{
            "p1i": { sym:"m₁v₁ᵢ", desc:"Initial momentum object 1", units:["kg·m/s"], toBase:[1] },
            "p2i": { sym:"m₂v₂ᵢ", desc:"Initial momentum object 2", units:["kg·m/s"], toBase:[1] },
            "p1f": { sym:"m₁v₁f", desc:"Final momentum object 1",   units:["kg·m/s"], toBase:[1] },
            "p2f": { sym:"m₂v₂f", desc:"Final momentum object 2",   units:["kg·m/s"], toBase:[1] }
          },
          solvers:{
            "p1f": v=>({ val:v.p1i+v.p2i-v.p2f,   rearr:"m₁v₁f = m₁v₁ᵢ + m₂v₂ᵢ − m₂v₂f",   sub:"p1i="+fN(v.p1i)+", p2i="+fN(v.p2i)+", p2f="+fN(v.p2f) }),
            "p2f": v=>({ val:v.p1i+v.p2i-v.p1f,   rearr:"m₂v₂f = m₁v₁ᵢ + m₂v₂ᵢ − m₁v₁f",   sub:"p1i="+fN(v.p1i)+", p2i="+fN(v.p2i)+", p1f="+fN(v.p1f) }),
            "p1i": v=>({ val:v.p1f+v.p2f-v.p2i,   rearr:"m₁v₁ᵢ = m₁v₁f + m₂v₂f − m₂v₂ᵢ",   sub:"p1f="+fN(v.p1f)+", p2f="+fN(v.p2f)+", p2i="+fN(v.p2i) }),
            "p2i": v=>({ val:v.p1f+v.p2f-v.p1i,   rearr:"m₂v₂ᵢ = m₁v₁f + m₂v₂f − m₁v₁ᵢ",   sub:"p1f="+fN(v.p1f)+", p2f="+fN(v.p2f)+", p1i="+fN(v.p1i) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 5 — OSCILLATIONS & WAVES
    // SHM, mechanical waves [50–62]
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "oscillations",
      title: "Oscillations & Waves",
      desc:  "Simple harmonic motion, period, frequency, angular frequency, wave speed, standing waves",
      equations: [

        // ── [50] SHM position ─────────────────────────────────────
        {
          id:"osc50", name:"SHM Position [50]",
          formula:"x(t) = A * cos(omega*t + phi)",
          desc:"Position of a simple harmonic oscillator. A = amplitude, φ = phase constant. (PRC Eq. 50)",
          ref:"PRC [50]",
          vars:{
            "x":   { sym:"x",  desc:"Displacement",   units:["m","cm"],  toBase:[1, 0.01] },
            "A":   { sym:"A",  desc:"Amplitude",       units:["m","cm"],  toBase:[1, 0.01] },
            "om":  { sym:"ω",  desc:"Angular frequency", units:["rad/s"], toBase:[1] },
            "t":   { sym:"t",  desc:"Time",            units:["s"],       toBase:[1] },
            "phi": { sym:"φ",  desc:"Phase constant",  units:["rad"],     toBase:[1] }
          },
          solvers:{
            "x":  v=>({ val:v.A*Math.cos(v.om*v.t+v.phi),   rearr:"x = A·cos(ωt+φ)",   sub:"A="+fN(v.A)+", ω="+fN(v.om)+", t="+fN(v.t)+", φ="+fN(v.phi) }),
            "A":  v=>({ val:v.x/Math.cos(v.om*v.t+v.phi),   rearr:"A = x / cos(ωt+φ)",  sub:"x="+fN(v.x)+", ω="+fN(v.om)+", t="+fN(v.t)+", φ="+fN(v.phi) })
          }
        },

        // ── [52/53] Period & frequency ────────────────────────────
        {
          id:"osc52", name:"Period, Frequency & Angular Frequency [52/53]",
          formula:"f = 1/T,  omega = 2*pi/T = 2*pi*f",
          desc:"Relationships among period T, frequency f, and angular frequency ω. (PRC Eq. 52, 53)",
          ref:"PRC [52][53]",
          vars:{
            "T":   { sym:"T",  desc:"Period",             units:["s","ms"], toBase:[1, 0.001] },
            "f":   { sym:"f",  desc:"Frequency",          units:["Hz","kHz"], toBase:[1, 1000] },
            "om":  { sym:"ω",  desc:"Angular frequency",  units:["rad/s"],   toBase:[1] }
          },
          solvers:{
            "T":   v=>({ val:1/v.f,              rearr:"T = 1/f",         sub:"f="+fN(v.f) }),
            "f":   v=>({ val:1/v.T,              rearr:"f = 1/T",         sub:"T="+fN(v.T) }),
            "om":  v=>({ val:2*Math.PI*v.f,      rearr:"ω = 2πf",        sub:"f="+fN(v.f) })
          }
        },

        // ── [54] Angular frequency of spring-mass ─────────────────
        {
          id:"osc54", name:"Angular Frequency — Spring-Mass [54]",
          formula:"omega = sqrt(k / m)",
          desc:"Natural angular frequency of a mass on a spring. (PRC Eq. 54)",
          ref:"PRC [54]",
          vars:{
            "om": { sym:"ω",  desc:"Angular frequency",  units:["rad/s"],   toBase:[1] },
            "k":  { sym:"k",  desc:"Spring constant",    units:["N/m"],     toBase:[1] },
            "m":  { sym:"m",  desc:"Mass",               units:["kg"],      toBase:[1] }
          },
          solvers:{
            "om": v=>({ val:Math.sqrt(v.k/v.m),       rearr:"ω = √(k/m)",    sub:"k="+fN(v.k)+", m="+fN(v.m) }),
            "k":  v=>({ val:v.om*v.om*v.m,            rearr:"k = ω²m",       sub:"ω="+fN(v.om)+", m="+fN(v.m) }),
            "m":  v=>({ val:v.k/(v.om*v.om),          rearr:"m = k/ω²",      sub:"k="+fN(v.k)+", ω="+fN(v.om) })
          }
        },

        // ── [56/57/58] Wave relationships ─────────────────────────
        {
          id:"wav58", name:"Wave Speed [58]",
          formula:"v = lambda * f",
          desc:"Wave speed = wavelength × frequency. Also v = ω/k where k=2π/λ. (PRC Eq. 58)",
          ref:"PRC [58]",
          vars:{
            "v":  { sym:"v",  desc:"Wave speed",    units:["m/s","km/s"], toBase:[1, 1000] },
            "lam":{ sym:"λ",  desc:"Wavelength",    units:["m","cm","nm"], toBase:[1, 0.01, 1e-9] },
            "f":  { sym:"f",  desc:"Frequency",     units:["Hz","kHz","MHz"], toBase:[1, 1000, 1e6] }
          },
          solvers:{
            "v":   v=>({ val:v.lam*v.f,     rearr:"v = λf",    sub:"λ="+fN(v.lam)+", f="+fN(v.f) }),
            "lam": v=>({ val:v.v/v.f,       rearr:"λ = v/f",   sub:"v="+fN(v.v)+", f="+fN(v.f) }),
            "f":   v=>({ val:v.v/v.lam,     rearr:"f = v/λ",   sub:"v="+fN(v.v)+", λ="+fN(v.lam) })
          }
        },

        // ── [60] Wave speed on string ─────────────────────────────
        {
          id:"wav60", name:"Wave Speed on a String [60]",
          formula:"v = sqrt(F_T / mu)",
          desc:"Speed of a transverse wave on a string. F_T = tension, μ = linear mass density (kg/m). (PRC Eq. 60)",
          ref:"PRC [60]",
          vars:{
            "v":  { sym:"v",   desc:"Wave speed",            units:["m/s"],  toBase:[1] },
            "FT": { sym:"F_T", desc:"Tension in string",     units:["N","lb"], toBase:[1, 4.44822] },
            "mu": { sym:"μ",   desc:"Linear mass density",   units:["kg/m"],  toBase:[1] }
          },
          solvers:{
            "v":  v=>({ val:Math.sqrt(v.FT/v.mu),   rearr:"v = √(F_T/μ)",   sub:"F_T="+fN(v.FT)+", μ="+fN(v.mu) }),
            "FT": v=>({ val:v.v*v.v*v.mu,            rearr:"F_T = v²μ",      sub:"v="+fN(v.v)+", μ="+fN(v.mu) }),
            "mu": v=>({ val:v.FT/(v.v*v.v),          rearr:"μ = F_T/v²",     sub:"F_T="+fN(v.FT)+", v="+fN(v.v) })
          }
        },

        // ── [61/62] Standing waves ────────────────────────────────
        {
          id:"wav62", name:"Standing Wave Frequencies (String) [61/62]",
          formula:"lambda_n = 2L/n,  fn = nv/(2L)",
          desc:"Harmonics for a string fixed at both ends. n = harmonic number (1, 2, 3...). (PRC Eq. 61, 62)",
          ref:"PRC [61][62]",
          vars:{
            "fn": { sym:"fₙ",  desc:"nth harmonic frequency",  units:["Hz"],  toBase:[1] },
            "n":  { sym:"n",   desc:"Harmonic number",          units:["dimensionless"], toBase:[1] },
            "v":  { sym:"v",   desc:"Wave speed on string",     units:["m/s"], toBase:[1] },
            "L":  { sym:"L",   desc:"Length of string",         units:["m","ft"], toBase:[1, 0.3048] }
          },
          solvers:{
            "fn": v=>({ val:v.n*v.v/(2*v.L),   rearr:"fₙ = nv/(2L)",   sub:"n="+fN(v.n)+", v="+fN(v.v)+", L="+fN(v.L) }),
            "v":  v=>({ val:2*v.L*v.fn/v.n,    rearr:"v = 2Lfₙ/n",     sub:"n="+fN(v.n)+", fₙ="+fN(v.fn)+", L="+fN(v.L) }),
            "L":  v=>({ val:v.n*v.v/(2*v.fn),  rearr:"L = nv/(2fₙ)",   sub:"n="+fN(v.n)+", v="+fN(v.v)+", fₙ="+fN(v.fn) }),
            "n":  v=>({ val:2*v.L*v.fn/v.v,    rearr:"n = 2Lfₙ/v",     sub:"L="+fN(v.L)+", fₙ="+fN(v.fn)+", v="+fN(v.v) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 6 — GRAVITATION & ROTATIONAL INERTIA
    // Universal gravitation + moment of inertia formulas [63–64, 76–83]
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "gravitation",
      title: "Gravitation & Inertia",
      desc:  "Universal gravitation, gravitational PE, and moment of inertia for common shapes",
      equations: [

        // ── [63] Gravitational force ──────────────────────────────
        {
          id:"grav63", name:"Gravitational Force [63]",
          formula:"|Fg| = G * m1 * m2 / r^2",
          desc:"Universal law of gravitation. G = 6.674×10⁻¹¹ N·m²/kg². (PRC Eq. 63)",
          ref:"PRC [63]",
          vars:{
            "Fg": { sym:"|F_g|", desc:"Gravitational force",   units:["N"],   toBase:[1] },
            "G":  { sym:"G",     desc:"Gravitational constant (6.674e-11)", units:["N·m2/kg2"], toBase:[1] },
            "m1": { sym:"m₁",   desc:"Mass of object 1",       units:["kg"],  toBase:[1] },
            "m2": { sym:"m₂",   desc:"Mass of object 2",       units:["kg"],  toBase:[1] },
            "r":  { sym:"r",    desc:"Distance between centers", units:["m","km"], toBase:[1, 1000] }
          },
          solvers:{
            "Fg": v=>({ val:v.G*v.m1*v.m2/(v.r*v.r),              rearr:"|F_g| = Gm₁m₂/r²",         sub:"G="+fN(v.G)+", m₁="+fN(v.m1)+", m₂="+fN(v.m2)+", r="+fN(v.r) }),
            "r":  v=>({ val:Math.sqrt(v.G*v.m1*v.m2/v.Fg),        rearr:"r = √(Gm₁m₂/|F_g|)",       sub:"|F_g|="+fN(v.Fg)+", G="+fN(v.G)+", m₁="+fN(v.m1)+", m₂="+fN(v.m2) }),
            "m1": v=>({ val:v.Fg*v.r*v.r/(v.G*v.m2),              rearr:"m₁ = |F_g|r²/(Gm₂)",       sub:"|F_g|="+fN(v.Fg)+", r="+fN(v.r)+", G="+fN(v.G)+", m₂="+fN(v.m2) }),
            "m2": v=>({ val:v.Fg*v.r*v.r/(v.G*v.m1),              rearr:"m₂ = |F_g|r²/(Gm₁)",       sub:"|F_g|="+fN(v.Fg)+", r="+fN(v.r)+", G="+fN(v.G)+", m₁="+fN(v.m1) })
          }
        },

        // ── [64] Gravitational PE ─────────────────────────────────
        {
          id:"grav64", name:"Gravitational Potential Energy — Universal [64]",
          formula:"Ug = -G * m1 * m2 / r",
          desc:"Gravitational PE between two masses. Negative because gravity is attractive. (PRC Eq. 64)",
          ref:"PRC [64]",
          vars:{
            "Ug": { sym:"U_g",  desc:"Gravitational PE",         units:["J"],   toBase:[1] },
            "G":  { sym:"G",    desc:"Gravitational constant",   units:["N·m2/kg2"], toBase:[1] },
            "m1": { sym:"m₁",  desc:"Mass of object 1",          units:["kg"],  toBase:[1] },
            "m2": { sym:"m₂",  desc:"Mass of object 2",          units:["kg"],  toBase:[1] },
            "r":  { sym:"r",   desc:"Distance between centers",  units:["m","km"], toBase:[1, 1000] }
          },
          solvers:{
            "Ug": v=>({ val:-v.G*v.m1*v.m2/v.r,              rearr:"U_g = −Gm₁m₂/r",         sub:"G="+fN(v.G)+", m₁="+fN(v.m1)+", m₂="+fN(v.m2)+", r="+fN(v.r) }),
            "r":  v=>({ val:-v.G*v.m1*v.m2/v.Ug,             rearr:"r = −Gm₁m₂/U_g",         sub:"U_g="+fN(v.Ug)+", G="+fN(v.G)+", m₁="+fN(v.m1)+", m₂="+fN(v.m2) }),
            "m1": v=>({ val:-v.Ug*v.r/(v.G*v.m2),            rearr:"m₁ = −U_g·r/(Gm₂)",      sub:"U_g="+fN(v.Ug)+", r="+fN(v.r)+", G="+fN(v.G)+", m₂="+fN(v.m2) })
          }
        },

        // ── [76] Thin rod (perp to length) ───────────────────────
        {
          id:"in76", name:"Moment of Inertia — Thin Rod (⊥ axis) [76]",
          formula:"I = (1/12) * M * L^2",
          desc:"Thin rod about axis through center, perpendicular to its length. (PRC Eq. 76)",
          ref:"PRC [76]",
          vars:{
            "I": { sym:"I",  desc:"Moment of inertia",  units:["kg·m2"], toBase:[1] },
            "M": { sym:"M",  desc:"Mass",                units:["kg"],    toBase:[1] },
            "L": { sym:"L",  desc:"Length of rod",       units:["m","ft"], toBase:[1, 0.3048] }
          },
          solvers:{
            "I": v=>({ val:v.M*v.L*v.L/12,           rearr:"I = (1/12)ML²",   sub:"M="+fN(v.M)+", L="+fN(v.L) }),
            "M": v=>({ val:12*v.I/(v.L*v.L),          rearr:"M = 12I/L²",      sub:"I="+fN(v.I)+", L="+fN(v.L) }),
            "L": v=>({ val:Math.sqrt(12*v.I/v.M),     rearr:"L = √(12I/M)",    sub:"I="+fN(v.I)+", M="+fN(v.M) })
          }
        },

        // ── [77] Solid cylinder / disk ────────────────────────────
        {
          id:"in77", name:"Moment of Inertia — Solid Cylinder / Disk [77]",
          formula:"I = (1/2) * M * R^2",
          desc:"Solid cylinder or disk about its central axis. (PRC Eq. 77)",
          ref:"PRC [77]",
          vars:{
            "I": { sym:"I",  desc:"Moment of inertia",  units:["kg·m2"], toBase:[1] },
            "M": { sym:"M",  desc:"Mass",                units:["kg"],    toBase:[1] },
            "R": { sym:"R",  desc:"Radius",              units:["m","cm"], toBase:[1, 0.01] }
          },
          solvers:{
            "I": v=>({ val:0.5*v.M*v.R*v.R,           rearr:"I = ½MR²",        sub:"M="+fN(v.M)+", R="+fN(v.R) }),
            "M": v=>({ val:2*v.I/(v.R*v.R),            rearr:"M = 2I/R²",       sub:"I="+fN(v.I)+", R="+fN(v.R) }),
            "R": v=>({ val:Math.sqrt(2*v.I/v.M),       rearr:"R = √(2I/M)",     sub:"I="+fN(v.I)+", M="+fN(v.M) })
          }
        },

        // ── [78] Solid sphere ─────────────────────────────────────
        {
          id:"in78", name:"Moment of Inertia — Solid Sphere [78]",
          formula:"I = (2/5) * M * R^2",
          desc:"Solid sphere about any diameter through center. (PRC Eq. 78)",
          ref:"PRC [78]",
          vars:{
            "I": { sym:"I",  desc:"Moment of inertia",  units:["kg·m2"], toBase:[1] },
            "M": { sym:"M",  desc:"Mass",                units:["kg"],    toBase:[1] },
            "R": { sym:"R",  desc:"Radius",              units:["m","cm"], toBase:[1, 0.01] }
          },
          solvers:{
            "I": v=>({ val:0.4*v.M*v.R*v.R,            rearr:"I = (2/5)MR²",    sub:"M="+fN(v.M)+", R="+fN(v.R) }),
            "M": v=>({ val:v.I/(0.4*v.R*v.R),           rearr:"M = I/(0.4R²)",   sub:"I="+fN(v.I)+", R="+fN(v.R) }),
            "R": v=>({ val:Math.sqrt(v.I/(0.4*v.M)),    rearr:"R = √(I/0.4M)",   sub:"I="+fN(v.I)+", M="+fN(v.M) })
          }
        },

        // ── [79] Thin spherical shell ─────────────────────────────
        {
          id:"in79", name:"Moment of Inertia — Thin Spherical Shell [79]",
          formula:"I = (2/3) * M * R^2",
          desc:"Thin spherical shell about any diameter. (PRC Eq. 79)",
          ref:"PRC [79]",
          vars:{
            "I": { sym:"I",  desc:"Moment of inertia",  units:["kg·m2"], toBase:[1] },
            "M": { sym:"M",  desc:"Mass",                units:["kg"],    toBase:[1] },
            "R": { sym:"R",  desc:"Radius",              units:["m","cm"], toBase:[1, 0.01] }
          },
          solvers:{
            "I": v=>({ val:2/3*v.M*v.R*v.R,             rearr:"I = (2/3)MR²",    sub:"M="+fN(v.M)+", R="+fN(v.R) }),
            "M": v=>({ val:v.I/(2/3*v.R*v.R),            rearr:"M = I/((2/3)R²)", sub:"I="+fN(v.I)+", R="+fN(v.R) }),
            "R": v=>({ val:Math.sqrt(v.I/(2/3*v.M)),     rearr:"R = √(I/((2/3)M))", sub:"I="+fN(v.I)+", M="+fN(v.M) })
          }
        },

        // ── [80] Hoop about diameter ──────────────────────────────
        {
          id:"in80", name:"Moment of Inertia — Hoop about Diameter [80]",
          formula:"I = (1/2) * M * R^2",
          desc:"Hoop (thin ring) about any diameter. Same formula as solid cylinder but different geometry. (PRC Eq. 80)",
          ref:"PRC [80]",
          vars:{
            "I": { sym:"I",  desc:"Moment of inertia",  units:["kg·m2"], toBase:[1] },
            "M": { sym:"M",  desc:"Mass",                units:["kg"],    toBase:[1] },
            "R": { sym:"R",  desc:"Radius of hoop",     units:["m","cm"], toBase:[1, 0.01] }
          },
          solvers:{
            "I": v=>({ val:0.5*v.M*v.R*v.R,            rearr:"I = ½MR²",        sub:"M="+fN(v.M)+", R="+fN(v.R) }),
            "M": v=>({ val:2*v.I/(v.R*v.R),             rearr:"M = 2I/R²",       sub:"I="+fN(v.I)+", R="+fN(v.R) }),
            "R": v=>({ val:Math.sqrt(2*v.I/v.M),        rearr:"R = √(2I/M)",     sub:"I="+fN(v.I)+", M="+fN(v.M) })
          }
        },

        // ── [81] Hoop about central axis ──────────────────────────
        {
          id:"in81", name:"Moment of Inertia — Hoop about Central Axis [81]",
          formula:"I = M * R^2",
          desc:"Hoop or thin ring about central axis through center (perpendicular to plane of ring). (PRC Eq. 81)",
          ref:"PRC [81]",
          vars:{
            "I": { sym:"I",  desc:"Moment of inertia",  units:["kg·m2"], toBase:[1] },
            "M": { sym:"M",  desc:"Mass",                units:["kg"],    toBase:[1] },
            "R": { sym:"R",  desc:"Radius of hoop",     units:["m","cm"], toBase:[1, 0.01] }
          },
          solvers:{
            "I": v=>({ val:v.M*v.R*v.R,                rearr:"I = MR²",          sub:"M="+fN(v.M)+", R="+fN(v.R) }),
            "M": v=>({ val:v.I/(v.R*v.R),               rearr:"M = I/R²",         sub:"I="+fN(v.I)+", R="+fN(v.R) }),
            "R": v=>({ val:Math.sqrt(v.I/v.M),          rearr:"R = √(I/M)",       sub:"I="+fN(v.I)+", M="+fN(v.M) })
          }
        },

        // ── [82] Annular cylinder ─────────────────────────────────
        {
          id:"in82", name:"Moment of Inertia — Annular Cylinder [82]",
          formula:"I = (1/2) * M * (R1^2 + R2^2)",
          desc:"Hollow cylinder (ring) about central axis. R1 = inner radius, R2 = outer radius. (PRC Eq. 82)",
          ref:"PRC [82]",
          vars:{
            "I":  { sym:"I",  desc:"Moment of inertia",  units:["kg·m2"], toBase:[1] },
            "M":  { sym:"M",  desc:"Mass",                units:["kg"],    toBase:[1] },
            "R1": { sym:"R₁", desc:"Inner radius",        units:["m","cm"], toBase:[1, 0.01] },
            "R2": { sym:"R₂", desc:"Outer radius",        units:["m","cm"], toBase:[1, 0.01] }
          },
          solvers:{
            "I":  v=>({ val:0.5*v.M*(v.R1*v.R1+v.R2*v.R2),           rearr:"I = ½M(R₁²+R₂²)",      sub:"M="+fN(v.M)+", R₁="+fN(v.R1)+", R₂="+fN(v.R2) }),
            "M":  v=>({ val:2*v.I/(v.R1*v.R1+v.R2*v.R2),             rearr:"M = 2I/(R₁²+R₂²)",     sub:"I="+fN(v.I)+", R₁="+fN(v.R1)+", R₂="+fN(v.R2) }),
            "R2": v=>({ val:Math.sqrt(2*v.I/v.M - v.R1*v.R1),        rearr:"R₂ = √(2I/M − R₁²)",   sub:"I="+fN(v.I)+", M="+fN(v.M)+", R₁="+fN(v.R1) })
          }
        },

        // ── [83] Rectangular slab ─────────────────────────────────
        {
          id:"in83", name:"Moment of Inertia — Rectangular Slab [83]",
          formula:"I = (1/12) * M * (a^2 + b^2)",
          desc:"Rectangular slab about perpendicular axis through center. a, b = side lengths. (PRC Eq. 83)",
          ref:"PRC [83]",
          vars:{
            "I": { sym:"I",  desc:"Moment of inertia",  units:["kg·m2"], toBase:[1] },
            "M": { sym:"M",  desc:"Mass",                units:["kg"],    toBase:[1] },
            "a": { sym:"a",  desc:"Side length a",       units:["m","cm"], toBase:[1, 0.01] },
            "b": { sym:"b",  desc:"Side length b",       units:["m","cm"], toBase:[1, 0.01] }
          },
          solvers:{
            "I": v=>({ val:v.M*(v.a*v.a+v.b*v.b)/12,           rearr:"I = (1/12)M(a²+b²)",    sub:"M="+fN(v.M)+", a="+fN(v.a)+", b="+fN(v.b) }),
            "M": v=>({ val:12*v.I/(v.a*v.a+v.b*v.b),           rearr:"M = 12I/(a²+b²)",       sub:"I="+fN(v.I)+", a="+fN(v.a)+", b="+fN(v.b) })
          }
        }
      ]
    }

  ]
};