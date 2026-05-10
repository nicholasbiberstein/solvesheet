// ================================================================
// SS201 — Introduction to Economics
// West Point — SS201 course equations organized by WPR block
// WPR1: Supply/Demand/Trade | WPR2: Costs/Profit | WPR3: Macro
// To update: edit ONLY this file, then push to GitHub.
// ================================================================

window.COURSE_SS201 = {
  id:          "ss201",
  code:        "SS201",
  name:        "Introduction to Economics",
  description: "Supply & demand, elasticity, costs, profit, GDP, CPI, inflation, and growth",

  tabs: [

    // ═══════════════════════════════════════════════════════════════
    // TAB 1 — SUPPLY, DEMAND & TRADE
    // Equilibrium, elasticity, comparative advantage, PPF
    // WPR 1
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "supply_demand",
      title: "Supply, Demand & Trade",
      desc:  "Equilibrium, price elasticity, cross-price elasticity, income elasticity, comparative advantage",
      equations: [

        // ── Equilibrium: Solve for P ─────────────────────────────
        {
          id:"equilibrium", name:"Market Equilibrium (Qd = Qs)",
          formula:"Qd = Qs  →  solve for P, then plug back in for Q",
          desc:"Set quantity demanded equal to quantity supplied to find equilibrium price and quantity.",
          ref:"WPR1",
          vars:{
            "Qd": { sym:"Qd", desc:"Quantity demanded (linear: a - b×P)", units:["units"], toBase:[1] },
            "Qs": { sym:"Qs", desc:"Quantity supplied (linear: c + d×P)",  units:["units"], toBase:[1] },
            "P":  { sym:"P",  desc:"Price",                                  units:["$"],     toBase:[1] }
          },
          solvers:{
            "Qd": v=>({ val:v.Qs,   rearr:"At equilibrium: Qd = Qs",   sub:"Qs="+fN(v.Qs) }),
            "Qs": v=>({ val:v.Qd,   rearr:"At equilibrium: Qs = Qd",   sub:"Qd="+fN(v.Qd) })
          }
        },

        // ── Price Elasticity of Demand (Midpoint) ────────────────
        {
          id:"ped_midpoint", name:"Price Elasticity of Demand — Midpoint Method",
          formula:"Ed = [(Q2-Q1)/((Q2+Q1)/2)] / [(P2-P1)/((P2+P1)/2)]",
          desc:"Measures responsiveness of quantity demanded to price change. |Ed|>1 elastic, |Ed|<1 inelastic, |Ed|=1 unit elastic. (WPR1)",
          ref:"WPR1",
          vars:{
            "Ed": { sym:"Ed",  desc:"Price elasticity of demand",   units:["dimensionless"], toBase:[1] },
            "Q1": { sym:"Q1",  desc:"Initial quantity demanded",     units:["units"],          toBase:[1] },
            "Q2": { sym:"Q2",  desc:"New quantity demanded",         units:["units"],          toBase:[1] },
            "P1": { sym:"P1",  desc:"Initial price",                 units:["$"],              toBase:[1] },
            "P2": { sym:"P2",  desc:"New price",                     units:["$"],              toBase:[1] }
          },
          solvers:{
            "Ed": v=>({
              val: ((v.Q2-v.Q1)/((v.Q2+v.Q1)/2)) / ((v.P2-v.P1)/((v.P2+v.P1)/2)),
              rearr:"Ed = [ΔQ/Q_avg] / [ΔP/P_avg]",
              sub:"Q1="+fN(v.Q1)+", Q2="+fN(v.Q2)+", P1="+fN(v.P1)+", P2="+fN(v.P2)
            }),
            "Q2": v=>({
              val:(function(){
                // Ed = [(Q2-Q1)/Qavg] / [(P2-P1)/Pavg]
                // Let r = Ed * (P2-P1)/Pavg = (Q2-Q1)/Qavg
                // Pavg = (P1+P2)/2, Qavg=(Q1+Q2)/2
                // r*(Q1+Q2)/2 = Q2-Q1 → rQ1/2 + rQ2/2 = Q2-Q1
                // rQ1/2 + Q1 = Q2 - rQ2/2 = Q2(1 - r/2)
                // Q2 = Q1*(1+r/2)/(1-r/2)  where r = Ed*(P2-P1)/((P1+P2)/2)
                var Pavg=(v.P1+v.P2)/2;
                var r=v.Ed*(v.P2-v.P1)/Pavg;
                return v.Q1*(1+r/2)/(1-r/2);
              })(),
              rearr:"Q2 = Q1×(1+r/2)/(1−r/2), r=Ed×ΔP/Pavg",
              sub:"Ed="+fN(v.Ed)+", Q1="+fN(v.Q1)+", P1="+fN(v.P1)+", P2="+fN(v.P2)
            })
          }
        },

        // ── Price Elasticity of Supply (Midpoint) ────────────────
        {
          id:"pes_midpoint", name:"Price Elasticity of Supply — Midpoint Method",
          formula:"Es = [(Q2-Q1)/((Q2+Q1)/2)] / [(P2-P1)/((P2+P1)/2)]",
          desc:"Measures responsiveness of quantity supplied to price change. Es>1 elastic, Es<1 inelastic. (WPR1)",
          ref:"WPR1",
          vars:{
            "Es": { sym:"Es",  desc:"Price elasticity of supply",  units:["dimensionless"], toBase:[1] },
            "Q1": { sym:"Q1",  desc:"Initial quantity supplied",    units:["units"],          toBase:[1] },
            "Q2": { sym:"Q2",  desc:"New quantity supplied",        units:["units"],          toBase:[1] },
            "P1": { sym:"P1",  desc:"Initial price",                units:["$"],              toBase:[1] },
            "P2": { sym:"P2",  desc:"New price",                    units:["$"],              toBase:[1] }
          },
          solvers:{
            "Es": v=>({
              val: ((v.Q2-v.Q1)/((v.Q2+v.Q1)/2)) / ((v.P2-v.P1)/((v.P2+v.P1)/2)),
              rearr:"Es = [ΔQ/Q_avg] / [ΔP/P_avg]",
              sub:"Q1="+fN(v.Q1)+", Q2="+fN(v.Q2)+", P1="+fN(v.P1)+", P2="+fN(v.P2)
            })
          }
        },

        // ── Cross-Price Elasticity ───────────────────────────────
        {
          id:"cross_price", name:"Cross-Price Elasticity of Demand",
          formula:"Exy = [%ΔQd_x] / [%ΔP_y]  (midpoint)",
          desc:"Positive = substitutes (beef & chicken). Negative = complements (cars & gas). (WPR1)",
          ref:"WPR1",
          vars:{
            "Exy":{ sym:"Exy", desc:"Cross-price elasticity",       units:["dimensionless"], toBase:[1] },
            "Q1": { sym:"Q1x", desc:"Initial quantity of good X",   units:["units"],          toBase:[1] },
            "Q2": { sym:"Q2x", desc:"New quantity of good X",       units:["units"],          toBase:[1] },
            "P1": { sym:"P1y", desc:"Initial price of good Y",      units:["$"],              toBase:[1] },
            "P2": { sym:"P2y", desc:"New price of good Y",          units:["$"],              toBase:[1] }
          },
          solvers:{
            "Exy": v=>({
              val: ((v.Q2-v.Q1)/((v.Q2+v.Q1)/2)) / ((v.P2-v.P1)/((v.P2+v.P1)/2)),
              rearr:"Exy = [ΔQx/Qx_avg] / [ΔPy/Py_avg]",
              sub:"Q1x="+fN(v.Q1)+", Q2x="+fN(v.Q2)+", P1y="+fN(v.P1)+", P2y="+fN(v.P2)
            })
          }
        },

        // ── Income Elasticity ────────────────────────────────────
        {
          id:"income_elast", name:"Income Elasticity of Demand",
          formula:"Ei = [%ΔQd] / [%ΔIncome]  (midpoint)",
          desc:"Positive = normal good. Negative = inferior good. >1 = luxury good. (WPR1)",
          ref:"WPR1",
          vars:{
            "Ei": { sym:"Ei",  desc:"Income elasticity",          units:["dimensionless"], toBase:[1] },
            "Q1": { sym:"Q1",  desc:"Initial quantity demanded",  units:["units"],          toBase:[1] },
            "Q2": { sym:"Q2",  desc:"New quantity demanded",      units:["units"],          toBase:[1] },
            "I1": { sym:"I1",  desc:"Initial income",             units:["$"],              toBase:[1] },
            "I2": { sym:"I2",  desc:"New income",                 units:["$"],              toBase:[1] }
          },
          solvers:{
            "Ei": v=>({
              val: ((v.Q2-v.Q1)/((v.Q2+v.Q1)/2)) / ((v.I2-v.I1)/((v.I2+v.I1)/2)),
              rearr:"Ei = [ΔQ/Q_avg] / [ΔI/I_avg]",
              sub:"Q1="+fN(v.Q1)+", Q2="+fN(v.Q2)+", I1="+fN(v.I1)+", I2="+fN(v.I2)
            })
          }
        },

        // ── Total Revenue ────────────────────────────────────────
        {
          id:"total_revenue", name:"Total Revenue",
          formula:"TR = P x Q",
          desc:"Total revenue received by a seller. When demand is elastic, a price decrease raises TR. (WPR1)",
          ref:"WPR1",
          vars:{
            "TR": { sym:"TR", desc:"Total revenue", units:["$"],     toBase:[1] },
            "P":  { sym:"P",  desc:"Price",          units:["$"],     toBase:[1] },
            "Q":  { sym:"Q",  desc:"Quantity sold",  units:["units"], toBase:[1] }
          },
          solvers:{
            "TR": v=>({ val:v.P*v.Q,    rearr:"TR = P × Q",    sub:"P="+fN(v.P)+", Q="+fN(v.Q) }),
            "P":  v=>({ val:v.TR/v.Q,   rearr:"P = TR / Q",    sub:"TR="+fN(v.TR)+", Q="+fN(v.Q) }),
            "Q":  v=>({ val:v.TR/v.P,   rearr:"Q = TR / P",    sub:"TR="+fN(v.TR)+", P="+fN(v.P) })
          }
        },

        // ── Opportunity Cost ─────────────────────────────────────
        {
          id:"opp_cost", name:"Opportunity Cost (Comparative Advantage)",
          formula:"OC_A = units_B_given_up / units_A_produced",
          desc:"Opportunity cost of producing one unit of A = how many units of B you forgo. Producer with lower OC has comparative advantage. (WPR1)",
          ref:"WPR1",
          vars:{
            "OC":  { sym:"OC",  desc:"Opportunity cost of producing 1 unit of A (in units of B)", units:["units/unit"], toBase:[1] },
            "QB":  { sym:"QB",  desc:"Units of B given up",      units:["units"], toBase:[1] },
            "QA":  { sym:"QA",  desc:"Units of A produced",      units:["units"], toBase:[1] }
          },
          solvers:{
            "OC": v=>({ val:v.QB/v.QA,   rearr:"OC = QB_given_up / QA_produced",   sub:"QB="+fN(v.QB)+", QA="+fN(v.QA) }),
            "QB": v=>({ val:v.OC*v.QA,   rearr:"QB = OC × QA",                      sub:"OC="+fN(v.OC)+", QA="+fN(v.QA) }),
            "QA": v=>({ val:v.QB/v.OC,   rearr:"QA = QB / OC",                      sub:"QB="+fN(v.QB)+", OC="+fN(v.OC) })
          }
        },

        // ── Consumer Surplus ─────────────────────────────────────
        {
          id:"consumer_surplus", name:"Consumer Surplus",
          formula:"CS = (1/2) x (WTP_max - P) x Q",
          desc:"Area below demand curve and above price. Value buyers receive beyond what they pay. (WPR1)",
          ref:"WPR1",
          vars:{
            "CS":  { sym:"CS",      desc:"Consumer surplus",            units:["$"],     toBase:[1] },
            "WTP": { sym:"WTP_max", desc:"Maximum willingness to pay",  units:["$"],     toBase:[1] },
            "P":   { sym:"P",       desc:"Market price",                 units:["$"],     toBase:[1] },
            "Q":   { sym:"Q",       desc:"Quantity exchanged",           units:["units"], toBase:[1] }
          },
          solvers:{
            "CS":  v=>({ val:0.5*(v.WTP-v.P)*v.Q,   rearr:"CS = ½ × (WTP_max − P) × Q",   sub:"WTP="+fN(v.WTP)+", P="+fN(v.P)+", Q="+fN(v.Q) }),
            "WTP": v=>({ val:2*v.CS/v.Q + v.P,       rearr:"WTP_max = 2×CS/Q + P",          sub:"CS="+fN(v.CS)+", Q="+fN(v.Q)+", P="+fN(v.P) }),
            "P":   v=>({ val:v.WTP - 2*v.CS/v.Q,     rearr:"P = WTP_max − 2×CS/Q",         sub:"CS="+fN(v.CS)+", WTP="+fN(v.WTP)+", Q="+fN(v.Q) }),
            "Q":   v=>({ val:2*v.CS/(v.WTP-v.P),     rearr:"Q = 2×CS / (WTP_max − P)",     sub:"CS="+fN(v.CS)+", WTP="+fN(v.WTP)+", P="+fN(v.P) })
          }
        },

        // ── Producer Surplus ─────────────────────────────────────
        {
          id:"producer_surplus", name:"Producer Surplus",
          formula:"PS = (1/2) x (P - Cost_min) x Q",
          desc:"Area above supply curve and below price. Benefit producers receive above their minimum willingness to sell. (WPR1)",
          ref:"WPR1",
          vars:{
            "PS":   { sym:"PS",       desc:"Producer surplus",              units:["$"],     toBase:[1] },
            "P":    { sym:"P",        desc:"Market price",                   units:["$"],     toBase:[1] },
            "Cmin": { sym:"Cost_min", desc:"Minimum cost/willingness to sell", units:["$"],  toBase:[1] },
            "Q":    { sym:"Q",        desc:"Quantity exchanged",             units:["units"], toBase:[1] }
          },
          solvers:{
            "PS":   v=>({ val:0.5*(v.P-v.Cmin)*v.Q,   rearr:"PS = ½ × (P − Cost_min) × Q",   sub:"P="+fN(v.P)+", Cost_min="+fN(v.Cmin)+", Q="+fN(v.Q) }),
            "P":    v=>({ val:2*v.PS/v.Q + v.Cmin,     rearr:"P = 2×PS/Q + Cost_min",          sub:"PS="+fN(v.PS)+", Q="+fN(v.Q)+", Cost_min="+fN(v.Cmin) }),
            "Cmin": v=>({ val:v.P - 2*v.PS/v.Q,        rearr:"Cost_min = P − 2×PS/Q",          sub:"PS="+fN(v.PS)+", P="+fN(v.P)+", Q="+fN(v.Q) }),
            "Q":    v=>({ val:2*v.PS/(v.P-v.Cmin),     rearr:"Q = 2×PS / (P − Cost_min)",     sub:"PS="+fN(v.PS)+", P="+fN(v.P)+", Cost_min="+fN(v.Cmin) })
          }
        },

        // ── Deadweight Loss (Tax/Price Control) ──────────────────
        {
          id:"dwl", name:"Deadweight Loss",
          formula:"DWL = (1/2) x (P_buyer - P_seller) x (Q_free - Q_new)",
          desc:"Loss of total surplus from a tax or price control. Size of the triangle between supply and demand curves. (WPR1)",
          ref:"WPR1",
          vars:{
            "DWL":  { sym:"DWL",      desc:"Deadweight loss",              units:["$"],     toBase:[1] },
            "Pb":   { sym:"P_buyer",  desc:"Price paid by buyer (after tax)", units:["$"],  toBase:[1] },
            "Ps":   { sym:"P_seller", desc:"Price received by seller",      units:["$"],    toBase:[1] },
            "Qfree":{ sym:"Q_free",   desc:"Free-market equilibrium quantity", units:["units"], toBase:[1] },
            "Qnew": { sym:"Q_new",    desc:"New quantity (with tax/control)", units:["units"], toBase:[1] }
          },
          solvers:{
            "DWL":  v=>({ val:0.5*(v.Pb-v.Ps)*(v.Qfree-v.Qnew),   rearr:"DWL = ½ × (P_buyer−P_seller) × (Q_free−Q_new)",   sub:"Pb="+fN(v.Pb)+", Ps="+fN(v.Ps)+", Qfree="+fN(v.Qfree)+", Qnew="+fN(v.Qnew) }),
            "Pb":   v=>({ val:2*v.DWL/(v.Qfree-v.Qnew)+v.Ps,       rearr:"P_buyer = 2×DWL/(Q_free−Q_new) + P_seller",       sub:"DWL="+fN(v.DWL)+", Ps="+fN(v.Ps)+", Qfree="+fN(v.Qfree)+", Qnew="+fN(v.Qnew) }),
            "Qnew": v=>({ val:v.Qfree - 2*v.DWL/(v.Pb-v.Ps),       rearr:"Q_new = Q_free − 2×DWL/(P_buyer−P_seller)",       sub:"DWL="+fN(v.DWL)+", Pb="+fN(v.Pb)+", Ps="+fN(v.Ps)+", Qfree="+fN(v.Qfree) })
          }
        },

        // ── Tax Revenue ──────────────────────────────────────────
        {
          id:"tax_revenue", name:"Tax Revenue",
          formula:"Tax Revenue = T x Q_new",
          desc:"Government revenue from a per-unit tax T. Buyer pays P_buyer, seller receives P_seller = P_buyer − T. (WPR1)",
          ref:"WPR1",
          vars:{
            "TR":   { sym:"Tax Rev", desc:"Tax revenue",             units:["$"],     toBase:[1] },
            "T":    { sym:"T",       desc:"Per-unit tax",             units:["$"],     toBase:[1] },
            "Qnew": { sym:"Q_new",   desc:"Quantity with tax",        units:["units"], toBase:[1] }
          },
          solvers:{
            "TR":   v=>({ val:v.T*v.Qnew,   rearr:"Tax Rev = T × Q_new",   sub:"T="+fN(v.T)+", Q_new="+fN(v.Qnew) }),
            "T":    v=>({ val:v.TR/v.Qnew,  rearr:"T = Tax Rev / Q_new",   sub:"Tax Rev="+fN(v.TR)+", Q_new="+fN(v.Qnew) }),
            "Qnew": v=>({ val:v.TR/v.T,     rearr:"Q_new = Tax Rev / T",   sub:"Tax Rev="+fN(v.TR)+", T="+fN(v.T) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 2 — COSTS & PROFIT
    // TC, FC, VC, AFC, AVC, ATC, MC, economic vs accounting profit
    // WPR 2
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "costs",
      title: "Costs & Profit",
      desc:  "Total cost, fixed/variable cost, average costs, marginal cost, economic profit",
      equations: [

        // ── Total Cost ───────────────────────────────────────────
        {
          id:"TC", name:"Total Cost",
          formula:"TC = FC + VC",
          desc:"Total cost = fixed cost + variable cost. (WPR2)",
          ref:"WPR2",
          vars:{
            "TC": { sym:"TC", desc:"Total cost",    units:["$"], toBase:[1] },
            "FC": { sym:"FC", desc:"Fixed cost",     units:["$"], toBase:[1] },
            "VC": { sym:"VC", desc:"Variable cost",  units:["$"], toBase:[1] }
          },
          solvers:{
            "TC": v=>({ val:v.FC+v.VC,   rearr:"TC = FC + VC",   sub:"FC="+fN(v.FC)+", VC="+fN(v.VC) }),
            "FC": v=>({ val:v.TC-v.VC,   rearr:"FC = TC − VC",   sub:"TC="+fN(v.TC)+", VC="+fN(v.VC) }),
            "VC": v=>({ val:v.TC-v.FC,   rearr:"VC = TC − FC",   sub:"TC="+fN(v.TC)+", FC="+fN(v.FC) })
          }
        },

        // ── Average Fixed Cost ───────────────────────────────────
        {
          id:"AFC", name:"Average Fixed Cost",
          formula:"AFC = FC / Q",
          desc:"Fixed cost per unit. Always decreasing as output rises (spreading overhead). (WPR2)",
          ref:"WPR2",
          vars:{
            "AFC": { sym:"AFC", desc:"Average fixed cost",  units:["$/unit"], toBase:[1] },
            "FC":  { sym:"FC",  desc:"Fixed cost",           units:["$"],      toBase:[1] },
            "Q":   { sym:"Q",   desc:"Quantity of output",   units:["units"],  toBase:[1] }
          },
          solvers:{
            "AFC": v=>({ val:v.FC/v.Q,    rearr:"AFC = FC / Q",    sub:"FC="+fN(v.FC)+", Q="+fN(v.Q) }),
            "FC":  v=>({ val:v.AFC*v.Q,   rearr:"FC = AFC × Q",    sub:"AFC="+fN(v.AFC)+", Q="+fN(v.Q) }),
            "Q":   v=>({ val:v.FC/v.AFC,  rearr:"Q = FC / AFC",    sub:"FC="+fN(v.FC)+", AFC="+fN(v.AFC) })
          }
        },

        // ── Average Variable Cost ────────────────────────────────
        {
          id:"AVC", name:"Average Variable Cost",
          formula:"AVC = VC / Q",
          desc:"Variable cost per unit of output. (WPR2)",
          ref:"WPR2",
          vars:{
            "AVC": { sym:"AVC", desc:"Average variable cost",  units:["$/unit"], toBase:[1] },
            "VC":  { sym:"VC",  desc:"Variable cost",           units:["$"],      toBase:[1] },
            "Q":   { sym:"Q",   desc:"Quantity of output",      units:["units"],  toBase:[1] }
          },
          solvers:{
            "AVC": v=>({ val:v.VC/v.Q,    rearr:"AVC = VC / Q",    sub:"VC="+fN(v.VC)+", Q="+fN(v.Q) }),
            "VC":  v=>({ val:v.AVC*v.Q,   rearr:"VC = AVC × Q",    sub:"AVC="+fN(v.AVC)+", Q="+fN(v.Q) }),
            "Q":   v=>({ val:v.VC/v.AVC,  rearr:"Q = VC / AVC",    sub:"VC="+fN(v.VC)+", AVC="+fN(v.AVC) })
          }
        },

        // ── Average Total Cost ───────────────────────────────────
        {
          id:"ATC", name:"Average Total Cost",
          formula:"ATC = TC / Q  =  AFC + AVC",
          desc:"Total cost per unit. At efficient scale, ATC is at its minimum. MC=ATC at minimum ATC. (WPR2)",
          ref:"WPR2",
          vars:{
            "ATC": { sym:"ATC", desc:"Average total cost",  units:["$/unit"], toBase:[1] },
            "TC":  { sym:"TC",  desc:"Total cost",           units:["$"],      toBase:[1] },
            "Q":   { sym:"Q",   desc:"Quantity of output",   units:["units"],  toBase:[1] }
          },
          solvers:{
            "ATC": v=>({ val:v.TC/v.Q,    rearr:"ATC = TC / Q",    sub:"TC="+fN(v.TC)+", Q="+fN(v.Q) }),
            "TC":  v=>({ val:v.ATC*v.Q,   rearr:"TC = ATC × Q",    sub:"ATC="+fN(v.ATC)+", Q="+fN(v.Q) }),
            "Q":   v=>({ val:v.TC/v.ATC,  rearr:"Q = TC / ATC",    sub:"TC="+fN(v.TC)+", ATC="+fN(v.ATC) })
          }
        },

        // ── ATC from AFC + AVC ───────────────────────────────────
        {
          id:"ATC2", name:"Average Total Cost = AFC + AVC",
          formula:"ATC = AFC + AVC",
          desc:"Average total cost equals average fixed plus average variable cost. (WPR2)",
          ref:"WPR2",
          vars:{
            "ATC": { sym:"ATC", desc:"Average total cost",    units:["$/unit"], toBase:[1] },
            "AFC": { sym:"AFC", desc:"Average fixed cost",    units:["$/unit"], toBase:[1] },
            "AVC": { sym:"AVC", desc:"Average variable cost", units:["$/unit"], toBase:[1] }
          },
          solvers:{
            "ATC": v=>({ val:v.AFC+v.AVC,   rearr:"ATC = AFC + AVC",   sub:"AFC="+fN(v.AFC)+", AVC="+fN(v.AVC) }),
            "AFC": v=>({ val:v.ATC-v.AVC,   rearr:"AFC = ATC − AVC",   sub:"ATC="+fN(v.ATC)+", AVC="+fN(v.AVC) }),
            "AVC": v=>({ val:v.ATC-v.AFC,   rearr:"AVC = ATC − AFC",   sub:"ATC="+fN(v.ATC)+", AFC="+fN(v.AFC) })
          }
        },

        // ── Marginal Cost ────────────────────────────────────────
        {
          id:"MC", name:"Marginal Cost",
          formula:"MC = delta_TC / delta_Q",
          desc:"Additional cost of producing one more unit. Firm maximizes profit where MC = MR. (WPR2)",
          ref:"WPR2",
          vars:{
            "MC":  { sym:"MC",  desc:"Marginal cost",          units:["$/unit"], toBase:[1] },
            "dTC": { sym:"ΔTC", desc:"Change in total cost",   units:["$"],      toBase:[1] },
            "dQ":  { sym:"ΔQ",  desc:"Change in quantity",     units:["units"],  toBase:[1] }
          },
          solvers:{
            "MC":  v=>({ val:v.dTC/v.dQ,   rearr:"MC = ΔTC / ΔQ",   sub:"ΔTC="+fN(v.dTC)+", ΔQ="+fN(v.dQ) }),
            "dTC": v=>({ val:v.MC*v.dQ,    rearr:"ΔTC = MC × ΔQ",   sub:"MC="+fN(v.MC)+", ΔQ="+fN(v.dQ) }),
            "dQ":  v=>({ val:v.dTC/v.MC,   rearr:"ΔQ = ΔTC / MC",   sub:"ΔTC="+fN(v.dTC)+", MC="+fN(v.MC) })
          }
        },

        // ── Marginal Revenue ─────────────────────────────────────
        {
          id:"MR", name:"Marginal Revenue",
          formula:"MR = delta_TR / delta_Q",
          desc:"Additional revenue from selling one more unit. For competitive firm: MR = P. (WPR2)",
          ref:"WPR2",
          vars:{
            "MR":  { sym:"MR",  desc:"Marginal revenue",       units:["$/unit"], toBase:[1] },
            "dTR": { sym:"ΔTR", desc:"Change in total revenue", units:["$"],     toBase:[1] },
            "dQ":  { sym:"ΔQ",  desc:"Change in quantity",      units:["units"], toBase:[1] }
          },
          solvers:{
            "MR":  v=>({ val:v.dTR/v.dQ,   rearr:"MR = ΔTR / ΔQ",   sub:"ΔTR="+fN(v.dTR)+", ΔQ="+fN(v.dQ) }),
            "dTR": v=>({ val:v.MR*v.dQ,    rearr:"ΔTR = MR × ΔQ",   sub:"MR="+fN(v.MR)+", ΔQ="+fN(v.dQ) }),
            "dQ":  v=>({ val:v.dTR/v.MR,   rearr:"ΔQ = ΔTR / MR",   sub:"ΔTR="+fN(v.dTR)+", MR="+fN(v.MR) })
          }
        },

        // ── Accounting Profit ────────────────────────────────────
        {
          id:"acct_profit", name:"Accounting Profit",
          formula:"Accounting Profit = TR - Explicit Costs",
          desc:"Profit using only explicit (out-of-pocket) costs. Does not subtract opportunity costs. (WPR2)",
          ref:"WPR2",
          vars:{
            "AP":  { sym:"Acct π", desc:"Accounting profit",   units:["$"], toBase:[1] },
            "TR":  { sym:"TR",     desc:"Total revenue",         units:["$"], toBase:[1] },
            "EC":  { sym:"Expl C", desc:"Explicit costs",        units:["$"], toBase:[1] }
          },
          solvers:{
            "AP": v=>({ val:v.TR-v.EC,   rearr:"Acct π = TR − Explicit Costs",   sub:"TR="+fN(v.TR)+", EC="+fN(v.EC) }),
            "TR": v=>({ val:v.AP+v.EC,   rearr:"TR = Acct π + Explicit Costs",   sub:"AP="+fN(v.AP)+", EC="+fN(v.EC) }),
            "EC": v=>({ val:v.TR-v.AP,   rearr:"Explicit Costs = TR − Acct π",   sub:"TR="+fN(v.TR)+", AP="+fN(v.AP) })
          }
        },

        // ── Economic Profit ──────────────────────────────────────
        {
          id:"econ_profit", name:"Economic Profit",
          formula:"Economic Profit = TR - Explicit Costs - Implicit Costs",
          desc:"True profit including opportunity costs (implicit costs). Zero economic profit = normal profit. (WPR2)",
          ref:"WPR2",
          vars:{
            "EP":  { sym:"Econ π", desc:"Economic profit",   units:["$"], toBase:[1] },
            "TR":  { sym:"TR",     desc:"Total revenue",       units:["$"], toBase:[1] },
            "EC":  { sym:"Expl C", desc:"Explicit costs",      units:["$"], toBase:[1] },
            "IC":  { sym:"Impl C", desc:"Implicit costs (opportunity costs)", units:["$"], toBase:[1] }
          },
          solvers:{
            "EP": v=>({ val:v.TR-v.EC-v.IC,    rearr:"Econ π = TR − Explicit − Implicit",   sub:"TR="+fN(v.TR)+", EC="+fN(v.EC)+", IC="+fN(v.IC) }),
            "TR": v=>({ val:v.EP+v.EC+v.IC,    rearr:"TR = Econ π + Explicit + Implicit",   sub:"EP="+fN(v.EP)+", EC="+fN(v.EC)+", IC="+fN(v.IC) }),
            "IC": v=>({ val:v.TR-v.EC-v.EP,    rearr:"Implicit = TR − Explicit − Econ π",   sub:"TR="+fN(v.TR)+", EC="+fN(v.EC)+", EP="+fN(v.EP) }),
            "EC": v=>({ val:v.TR-v.IC-v.EP,    rearr:"Explicit = TR − Implicit − Econ π",   sub:"TR="+fN(v.TR)+", IC="+fN(v.IC)+", EP="+fN(v.EP) })
          }
        },

        // ── Profit-Maximizing Output Rule ────────────────────────
        {
          id:"profit_max", name:"Profit-Maximizing Rule",
          formula:"Profit = TR - TC",
          desc:"Firm maximizes profit where MR = MC. Profit = TR − TC. (WPR2)",
          ref:"WPR2",
          vars:{
            "profit":{ sym:"π",  desc:"Profit",          units:["$"], toBase:[1] },
            "TR":    { sym:"TR", desc:"Total revenue",    units:["$"], toBase:[1] },
            "TC":    { sym:"TC", desc:"Total cost",       units:["$"], toBase:[1] }
          },
          solvers:{
            "profit": v=>({ val:v.TR-v.TC,      rearr:"π = TR − TC",    sub:"TR="+fN(v.TR)+", TC="+fN(v.TC) }),
            "TR":     v=>({ val:v.profit+v.TC,  rearr:"TR = π + TC",    sub:"π="+fN(v.profit)+", TC="+fN(v.TC) }),
            "TC":     v=>({ val:v.TR-v.profit,  rearr:"TC = TR − π",    sub:"TR="+fN(v.TR)+", π="+fN(v.profit) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 3 — GDP & NATIONAL ACCOUNTS
    // Nominal GDP, Real GDP, GDP Deflator, expenditure approach
    // WPR 3
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "gdp",
      title: "GDP & National Accounts",
      desc:  "Expenditure approach, nominal vs real GDP, GDP deflator",
      equations: [

        // ── GDP Expenditure Approach ─────────────────────────────
        {
          id:"GDP_exp", name:"GDP — Expenditure Approach",
          formula:"GDP = C + I + G + NX",
          desc:"C=Consumption, I=Investment (new capital, not stocks), G=Gov't purchases, NX=Exports−Imports. (WPR3)",
          ref:"WPR3",
          vars:{
            "GDP": { sym:"GDP", desc:"Gross Domestic Product",       units:["$B","$M","$"], toBase:[1, 0.001, 1e-9] },
            "C":   { sym:"C",   desc:"Consumption (household spending)", units:["$B","$M","$"], toBase:[1, 0.001, 1e-9] },
            "I":   { sym:"I",   desc:"Investment (new capital/housing)", units:["$B","$M","$"], toBase:[1, 0.001, 1e-9] },
            "G":   { sym:"G",   desc:"Government purchases",           units:["$B","$M","$"], toBase:[1, 0.001, 1e-9] },
            "NX":  { sym:"NX",  desc:"Net exports (Exports − Imports)", units:["$B","$M","$"], toBase:[1, 0.001, 1e-9] }
          },
          solvers:{
            "GDP": v=>({ val:v.C+v.I+v.G+v.NX,       rearr:"GDP = C + I + G + NX",      sub:"C="+fN(v.C)+", I="+fN(v.I)+", G="+fN(v.G)+", NX="+fN(v.NX) }),
            "C":   v=>({ val:v.GDP-v.I-v.G-v.NX,     rearr:"C = GDP − I − G − NX",      sub:"GDP="+fN(v.GDP)+", I="+fN(v.I)+", G="+fN(v.G)+", NX="+fN(v.NX) }),
            "I":   v=>({ val:v.GDP-v.C-v.G-v.NX,     rearr:"I = GDP − C − G − NX",      sub:"GDP="+fN(v.GDP)+", C="+fN(v.C)+", G="+fN(v.G)+", NX="+fN(v.NX) }),
            "G":   v=>({ val:v.GDP-v.C-v.I-v.NX,     rearr:"G = GDP − C − I − NX",      sub:"GDP="+fN(v.GDP)+", C="+fN(v.C)+", I="+fN(v.I)+", NX="+fN(v.NX) }),
            "NX":  v=>({ val:v.GDP-v.C-v.I-v.G,      rearr:"NX = GDP − C − I − G",      sub:"GDP="+fN(v.GDP)+", C="+fN(v.C)+", I="+fN(v.I)+", G="+fN(v.G) })
          }
        },

        // ── Net Exports ──────────────────────────────────────────
        {
          id:"NX", name:"Net Exports",
          formula:"NX = Exports - Imports",
          desc:"Trade balance. Positive = trade surplus; negative = trade deficit. (WPR3)",
          ref:"WPR3",
          vars:{
            "NX":  { sym:"NX",  desc:"Net exports",  units:["$B","$M","$"], toBase:[1, 0.001, 1e-9] },
            "EX":  { sym:"EX",  desc:"Exports",       units:["$B","$M","$"], toBase:[1, 0.001, 1e-9] },
            "IM":  { sym:"IM",  desc:"Imports",       units:["$B","$M","$"], toBase:[1, 0.001, 1e-9] }
          },
          solvers:{
            "NX":  v=>({ val:v.EX-v.IM,    rearr:"NX = EX − IM",    sub:"EX="+fN(v.EX)+", IM="+fN(v.IM) }),
            "EX":  v=>({ val:v.NX+v.IM,    rearr:"EX = NX + IM",    sub:"NX="+fN(v.NX)+", IM="+fN(v.IM) }),
            "IM":  v=>({ val:v.EX-v.NX,    rearr:"IM = EX − NX",    sub:"EX="+fN(v.EX)+", NX="+fN(v.NX) })
          }
        },

        // ── GDP Deflator ─────────────────────────────────────────
        {
          id:"gdp_deflator", name:"GDP Deflator",
          formula:"GDP Deflator = (Nominal GDP / Real GDP) x 100",
          desc:"Price index measuring economy-wide inflation relative to base year (deflator=100). (WPR3)",
          ref:"WPR3",
          vars:{
            "D":    { sym:"Deflator",  desc:"GDP Deflator",    units:["index"],  toBase:[1] },
            "NGDP": { sym:"Nom. GDP",  desc:"Nominal GDP",     units:["$B","$"], toBase:[1, 1e-9] },
            "RGDP": { sym:"Real GDP",  desc:"Real GDP",         units:["$B","$"], toBase:[1, 1e-9] }
          },
          solvers:{
            "D":    v=>({ val:v.NGDP/v.RGDP*100,   rearr:"Deflator = (Nom. GDP / Real GDP) × 100",   sub:"Nom.="+fN(v.NGDP)+", Real="+fN(v.RGDP) }),
            "NGDP": v=>({ val:v.D/100*v.RGDP,       rearr:"Nom. GDP = (Deflator/100) × Real GDP",     sub:"Deflator="+fN(v.D)+", Real="+fN(v.RGDP) }),
            "RGDP": v=>({ val:v.NGDP/(v.D/100),     rearr:"Real GDP = Nom. GDP / (Deflator/100)",     sub:"Nom.="+fN(v.NGDP)+", Deflator="+fN(v.D) })
          }
        },

        // ── Convert Nominal to Real GDP ──────────────────────────
        {
          id:"real_gdp", name:"Real GDP (from Nominal and Deflator)",
          formula:"Real GDP = (Nominal GDP / Deflator) x 100",
          desc:"Adjusts nominal GDP for price changes using the GDP deflator. (WPR3)",
          ref:"WPR3",
          vars:{
            "RGDP": { sym:"Real GDP",  desc:"Real GDP (constant prices)", units:["$B","$"], toBase:[1, 1e-9] },
            "NGDP": { sym:"Nom. GDP",  desc:"Nominal GDP (current prices)", units:["$B","$"], toBase:[1, 1e-9] },
            "D":    { sym:"Deflator",  desc:"GDP Deflator",                  units:["index"], toBase:[1] }
          },
          solvers:{
            "RGDP": v=>({ val:v.NGDP/v.D*100,   rearr:"Real GDP = (Nom. GDP / Deflator) × 100",   sub:"Nom.="+fN(v.NGDP)+", Deflator="+fN(v.D) }),
            "NGDP": v=>({ val:v.RGDP*v.D/100,   rearr:"Nom. GDP = Real GDP × (Deflator/100)",     sub:"Real="+fN(v.RGDP)+", Deflator="+fN(v.D) }),
            "D":    v=>({ val:v.NGDP/v.RGDP*100, rearr:"Deflator = (Nom. GDP / Real GDP) × 100", sub:"Nom.="+fN(v.NGDP)+", Real="+fN(v.RGDP) })
          }
        },

        // ── GDP Growth Rate ──────────────────────────────────────
        {
          id:"gdp_growth", name:"GDP Growth Rate",
          formula:"g = (GDP2 - GDP1) / GDP1 × 100",
          desc:"Percentage growth in real GDP from one period to the next. (WPR3)",
          ref:"WPR3",
          vars:{
            "g":    { sym:"g",    desc:"GDP growth rate",   units:["%"],     toBase:[1] },
            "GDP1": { sym:"GDP1", desc:"Initial real GDP",  units:["$B","$"], toBase:[1, 1e-9] },
            "GDP2": { sym:"GDP2", desc:"New real GDP",       units:["$B","$"], toBase:[1, 1e-9] }
          },
          solvers:{
            "g":    v=>({ val:(v.GDP2-v.GDP1)/v.GDP1*100,   rearr:"g = (GDP2−GDP1)/GDP1 × 100",   sub:"GDP2="+fN(v.GDP2)+", GDP1="+fN(v.GDP1) }),
            "GDP2": v=>({ val:v.GDP1*(1+v.g/100),           rearr:"GDP2 = GDP1 × (1 + g/100)",    sub:"GDP1="+fN(v.GDP1)+", g="+fN(v.g)+"%" }),
            "GDP1": v=>({ val:v.GDP2/(1+v.g/100),           rearr:"GDP1 = GDP2 / (1 + g/100)",    sub:"GDP2="+fN(v.GDP2)+", g="+fN(v.g)+"%" })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 4 — INFLATION & PRICE LEVEL
    // CPI, inflation rate, real vs nominal values
    // WPR 3
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "inflation",
      title: "Inflation & Price Level",
      desc:  "Consumer Price Index, inflation rate, converting nominal to real values",
      equations: [

        // ── CPI ──────────────────────────────────────────────────
        {
          id:"CPI", name:"Consumer Price Index (CPI)",
          formula:"CPI = (Cost of basket in current year / Cost of basket in base year) × 100",
          desc:"Measures cost of living using a fixed basket of goods. Base year CPI = 100. (WPR3)",
          ref:"WPR3",
          vars:{
            "CPI":  { sym:"CPI",     desc:"Consumer Price Index",           units:["index"], toBase:[1] },
            "Pcur": { sym:"P_curr",  desc:"Cost of basket in current year", units:["$"],     toBase:[1] },
            "Pbase":{ sym:"P_base",  desc:"Cost of basket in base year",    units:["$"],     toBase:[1] }
          },
          solvers:{
            "CPI":  v=>({ val:v.Pcur/v.Pbase*100,   rearr:"CPI = (P_curr/P_base) × 100",   sub:"P_curr="+fN(v.Pcur)+", P_base="+fN(v.Pbase) }),
            "Pcur": v=>({ val:v.CPI/100*v.Pbase,    rearr:"P_curr = (CPI/100) × P_base",   sub:"CPI="+fN(v.CPI)+", P_base="+fN(v.Pbase) }),
            "Pbase":v=>({ val:v.Pcur/(v.CPI/100),   rearr:"P_base = P_curr / (CPI/100)",   sub:"P_curr="+fN(v.Pcur)+", CPI="+fN(v.CPI) })
          }
        },

        // ── Inflation Rate ───────────────────────────────────────
        {
          id:"inflation_rate", name:"Inflation Rate",
          formula:"Inflation = (CPI2 - CPI1) / CPI1 × 100",
          desc:"Percentage change in CPI from one year to the next. (WPR3)",
          ref:"WPR3",
          vars:{
            "inf":  { sym:"π",    desc:"Inflation rate",    units:["%"],     toBase:[1] },
            "CPI1": { sym:"CPI1", desc:"CPI in year 1",     units:["index"], toBase:[1] },
            "CPI2": { sym:"CPI2", desc:"CPI in year 2",     units:["index"], toBase:[1] }
          },
          solvers:{
            "inf":  v=>({ val:(v.CPI2-v.CPI1)/v.CPI1*100,   rearr:"π = (CPI2−CPI1)/CPI1 × 100",   sub:"CPI2="+fN(v.CPI2)+", CPI1="+fN(v.CPI1) }),
            "CPI2": v=>({ val:v.CPI1*(1+v.inf/100),          rearr:"CPI2 = CPI1 × (1+π/100)",       sub:"CPI1="+fN(v.CPI1)+", π="+fN(v.inf)+"%" }),
            "CPI1": v=>({ val:v.CPI2/(1+v.inf/100),          rearr:"CPI1 = CPI2 / (1+π/100)",       sub:"CPI2="+fN(v.CPI2)+", π="+fN(v.inf)+"%" })
          }
        },

        // ── Convert Nominal to Real (any value) ──────────────────
        {
          id:"real_value", name:"Convert Nominal to Real Value",
          formula:"Real Value = (Nominal Value / CPI) × 100",
          desc:"Adjusts any nominal dollar amount (wages, prices, etc.) for inflation using CPI. (WPR3)",
          ref:"WPR3",
          vars:{
            "RV":  { sym:"Real",    desc:"Real value (constant dollars)",   units:["$"], toBase:[1] },
            "NV":  { sym:"Nominal", desc:"Nominal value (current dollars)",  units:["$"], toBase:[1] },
            "CPI": { sym:"CPI",     desc:"CPI in that year",                 units:["index"], toBase:[1] }
          },
          solvers:{
            "RV":  v=>({ val:v.NV/v.CPI*100,   rearr:"Real = (Nominal/CPI) × 100",   sub:"Nominal="+fN(v.NV)+", CPI="+fN(v.CPI) }),
            "NV":  v=>({ val:v.RV*v.CPI/100,   rearr:"Nominal = Real × (CPI/100)",   sub:"Real="+fN(v.RV)+", CPI="+fN(v.CPI) }),
            "CPI": v=>({ val:v.NV/v.RV*100,    rearr:"CPI = (Nominal/Real) × 100",   sub:"Nominal="+fN(v.NV)+", Real="+fN(v.RV) })
          }
        },

        // ── Nominal Interest Rate ─────────────────────────────────
        {
          id:"fisher", name:"Fisher Equation — Real Interest Rate",
          formula:"Real rate = Nominal rate - Inflation rate",
          desc:"Fisher equation: nominal rate adjusted for inflation gives real rate. (WPR3)",
          ref:"WPR3",
          vars:{
            "rr":  { sym:"r",  desc:"Real interest rate",     units:["%"], toBase:[1] },
            "nr":  { sym:"i",  desc:"Nominal interest rate",  units:["%"], toBase:[1] },
            "inf": { sym:"π",  desc:"Inflation rate",          units:["%"], toBase:[1] }
          },
          solvers:{
            "rr":  v=>({ val:v.nr-v.inf,   rearr:"r = i − π",   sub:"i="+fN(v.nr)+"%, π="+fN(v.inf)+"%" }),
            "nr":  v=>({ val:v.rr+v.inf,   rearr:"i = r + π",   sub:"r="+fN(v.rr)+"%, π="+fN(v.inf)+"%" }),
            "inf": v=>({ val:v.nr-v.rr,    rearr:"π = i − r",   sub:"i="+fN(v.nr)+"%, r="+fN(v.rr)+"%" })
          }
        },

        // ── Dollars Across Time ──────────────────────────────────
        {
          id:"dollars_time", name:"Dollars Across Time (Adjusting for Inflation)",
          formula:"Amount_today = Amount_year_t × (CPI_today / CPI_year_t)",
          desc:"Converts a dollar amount from year t into today's dollars using the CPI ratio. (WPR3)",
          ref:"WPR3",
          vars:{
            "Vtoday": { sym:"V_today",  desc:"Value in today's dollars",  units:["$"], toBase:[1] },
            "Vt":     { sym:"V_t",      desc:"Value in year t dollars",   units:["$"], toBase:[1] },
            "CPIt":   { sym:"CPI_t",    desc:"CPI in year t",              units:["index"], toBase:[1] },
            "CPInow": { sym:"CPI_now",  desc:"CPI today",                  units:["index"], toBase:[1] }
          },
          solvers:{
            "Vtoday": v=>({ val:v.Vt*v.CPInow/v.CPIt,     rearr:"V_today = V_t × (CPI_now / CPI_t)",   sub:"V_t="+fN(v.Vt)+", CPI_now="+fN(v.CPInow)+", CPI_t="+fN(v.CPIt) }),
            "Vt":     v=>({ val:v.Vtoday*v.CPIt/v.CPInow, rearr:"V_t = V_today × (CPI_t / CPI_now)",   sub:"V_today="+fN(v.Vtoday)+", CPI_t="+fN(v.CPIt)+", CPI_now="+fN(v.CPInow) }),
            "CPIt":   v=>({ val:v.Vt*v.CPInow/v.Vtoday,   rearr:"CPI_t = V_t × CPI_now / V_today",    sub:"V_t="+fN(v.Vt)+", CPI_now="+fN(v.CPInow)+", V_today="+fN(v.Vtoday) }),
            "CPInow": v=>({ val:v.Vtoday*v.CPIt/v.Vt,     rearr:"CPI_now = V_today × CPI_t / V_t",    sub:"V_today="+fN(v.Vtoday)+", CPI_t="+fN(v.CPIt)+", V_t="+fN(v.Vt) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 5 — GROWTH & PRODUCTIVITY
    // Rule of 70, growth rate, productivity function
    // WPR 3
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "growth",
      title: "Growth & Productivity",
      desc:  "Rule of 70, exponential growth, GDP per capita, productivity",
      equations: [

        // ── Rule of 70 ───────────────────────────────────────────
        {
          id:"rule70", name:"Rule of 70 — Doubling Time",
          formula:"Years to double = 70 / growth rate (%)",
          desc:"Approximates how many years it takes for a quantity to double at a constant growth rate. (WPR3)",
          ref:"WPR3",
          vars:{
            "T": { sym:"T",  desc:"Years to double",           units:["years"], toBase:[1] },
            "g": { sym:"g",  desc:"Annual growth rate",         units:["%"],     toBase:[1] }
          },
          solvers:{
            "T": v=>({ val:70/v.g,    rearr:"T = 70 / g",    sub:"g="+fN(v.g)+"%" }),
            "g": v=>({ val:70/v.T,    rearr:"g = 70 / T",    sub:"T="+fN(v.T)+" years" })
          }
        },

        // ── Future Value with Compound Growth ────────────────────
        {
          id:"compound_growth", name:"Future Value with Compound Growth",
          formula:"Y_t = Y_0 × (1 + g)^t",
          desc:"Value of GDP (or any quantity) after t years of annual growth rate g. (WPR3)",
          ref:"WPR3",
          vars:{
            "Yt": { sym:"Y_t", desc:"Value at year t",         units:["$","units"], toBase:[1] },
            "Y0": { sym:"Y_0", desc:"Initial value (year 0)",  units:["$","units"], toBase:[1] },
            "g":  { sym:"g",   desc:"Annual growth rate (decimal, e.g. 0.02)", units:["dimensionless"], toBase:[1] },
            "t":  { sym:"t",   desc:"Number of years",          units:["years"],     toBase:[1] }
          },
          solvers:{
            "Yt": v=>({ val:v.Y0*Math.pow(1+v.g, v.t),                          rearr:"Y_t = Y_0 × (1+g)^t",             sub:"Y_0="+fN(v.Y0)+", g="+fN(v.g)+", t="+fN(v.t) }),
            "Y0": v=>({ val:v.Yt/Math.pow(1+v.g, v.t),                          rearr:"Y_0 = Y_t / (1+g)^t",             sub:"Y_t="+fN(v.Yt)+", g="+fN(v.g)+", t="+fN(v.t) }),
            "t":  v=>({ val:Math.log(v.Yt/v.Y0)/Math.log(1+v.g),               rearr:"t = ln(Y_t/Y_0) / ln(1+g)",       sub:"Y_t="+fN(v.Yt)+", Y_0="+fN(v.Y0)+", g="+fN(v.g) }),
            "g":  v=>({ val:Math.pow(v.Yt/v.Y0, 1/v.t)-1,                      rearr:"g = (Y_t/Y_0)^(1/t) − 1",        sub:"Y_t="+fN(v.Yt)+", Y_0="+fN(v.Y0)+", t="+fN(v.t) })
          }
        },

        // ── GDP Per Capita ───────────────────────────────────────
        {
          id:"gdp_per_capita", name:"GDP Per Capita",
          formula:"GDP per capita = GDP / Population",
          desc:"Standard of living measure: output per person. (WPR3)",
          ref:"WPR3",
          vars:{
            "GPC": { sym:"GDP/capita", desc:"GDP per capita",   units:["$"],        toBase:[1] },
            "GDP": { sym:"GDP",        desc:"Total GDP",         units:["$B","$"],   toBase:[1, 1e-9] },
            "Pop": { sym:"Population", desc:"Population",        units:["millions","units"], toBase:[1e6, 1] }
          },
          solvers:{
            "GPC": v=>({ val:v.GDP/v.Pop,   rearr:"GDP/capita = GDP / Population",   sub:"GDP="+fN(v.GDP)+", Pop="+fN(v.Pop) }),
            "GDP": v=>({ val:v.GPC*v.Pop,   rearr:"GDP = GDP/capita × Population",   sub:"GPC="+fN(v.GPC)+", Pop="+fN(v.Pop) }),
            "Pop": v=>({ val:v.GDP/v.GPC,   rearr:"Population = GDP / GDP/capita",   sub:"GDP="+fN(v.GDP)+", GPC="+fN(v.GPC) })
          }
        },

        // ── Labor Productivity ───────────────────────────────────
        {
          id:"productivity", name:"Labor Productivity",
          formula:"Productivity = Output / Labor hours",
          desc:"Output produced per unit of labor input. Driven by physical capital, human capital, technology, and natural resources. (WPR3)",
          ref:"WPR3",
          vars:{
            "Prod": { sym:"Prod",   desc:"Labor productivity",  units:["units/hr","$/hr"], toBase:[1] },
            "Y":    { sym:"Y",      desc:"Total output",         units:["units","$"],        toBase:[1] },
            "L":    { sym:"L",      desc:"Labor hours",           units:["hours"],            toBase:[1] }
          },
          solvers:{
            "Prod": v=>({ val:v.Y/v.L,     rearr:"Productivity = Y / L",   sub:"Y="+fN(v.Y)+", L="+fN(v.L) }),
            "Y":    v=>({ val:v.Prod*v.L,  rearr:"Y = Productivity × L",   sub:"Prod="+fN(v.Prod)+", L="+fN(v.L) }),
            "L":    v=>({ val:v.Y/v.Prod,  rearr:"L = Y / Productivity",   sub:"Y="+fN(v.Y)+", Prod="+fN(v.Prod) })
          }
        },

        // ── Growth Rate of Productivity ──────────────────────────
        {
          id:"prod_growth", name:"Productivity Growth Rate",
          formula:"g_prod = (Prod2 - Prod1) / Prod1 × 100",
          desc:"Percentage change in labor productivity from one period to the next. (WPR3)",
          ref:"WPR3",
          vars:{
            "g":     { sym:"g",     desc:"Productivity growth rate",      units:["%"],        toBase:[1] },
            "Prod1": { sym:"Prod1", desc:"Initial productivity",           units:["units/hr"], toBase:[1] },
            "Prod2": { sym:"Prod2", desc:"New productivity",               units:["units/hr"], toBase:[1] }
          },
          solvers:{
            "g":     v=>({ val:(v.Prod2-v.Prod1)/v.Prod1*100,   rearr:"g = (Prod2−Prod1)/Prod1 × 100",   sub:"Prod2="+fN(v.Prod2)+", Prod1="+fN(v.Prod1) }),
            "Prod2": v=>({ val:v.Prod1*(1+v.g/100),             rearr:"Prod2 = Prod1 × (1 + g/100)",     sub:"Prod1="+fN(v.Prod1)+", g="+fN(v.g)+"%" }),
            "Prod1": v=>({ val:v.Prod2/(1+v.g/100),             rearr:"Prod1 = Prod2 / (1 + g/100)",     sub:"Prod2="+fN(v.Prod2)+", g="+fN(v.g)+"%" })
          }
        }
      ]
    }

  ]
};