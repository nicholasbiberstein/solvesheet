// ================================================================
// MA206 — Probability and Statistics (AY25-1)
// West Point — Introduction to Statistical Investigations
// Every formula is from the MA206 Course Guide (2024-08-20).
// Organized into 4 tabs matching the course block structure.
// To update: edit ONLY this file, then push to GitHub.
// ================================================================

window.COURSE_MA206 = {
  id:          "ma206",
  code:        "MA206",
  name:        "Probability & Statistics",
  description: "Hypothesis tests, confidence intervals, regression, and probability",

  tabs: [

    // ═══════════════════════════════════════════════════════════════
    // TAB 1 — SIGNIFICANCE & GENERALIZATION
    // One-proportion z-test, One-sample t-test
    // Lessons 3–7
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "significance",
      title: "Significance & Generalization",
      desc:  "One-proportion z-test, one-sample t-test, standardized statistics, p-values",
      equations: [

        // ── Standardized Statistic (General) ─────────────────────
        {
          id:"std_stat", name:"Standardized Statistic (z or t)",
          formula:"z = (statistic - null) / SD_null",
          desc:"General form for any standardized test statistic. SD_null is the standard deviation of the null distribution. (Course Guide p.49)",
          ref:"CG p.49",
          vars:{
            "z":    { sym:"z",         desc:"Standardized statistic",          units:["dimensionless"], toBase:[1] },
            "stat": { sym:"statistic",  desc:"Observed sample statistic",       units:["dimensionless"], toBase:[1] },
            "null": { sym:"null",       desc:"Null hypothesis value",           units:["dimensionless"], toBase:[1] },
            "SD":   { sym:"SD_null",    desc:"Std deviation of null distribution", units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "z":    v=>({ val:(v.stat-v.null)/v.SD,        rearr:"z = (statistic - null) / SD_null",    sub:"stat="+fN(v.stat)+", null="+fN(v.null)+", SD="+fN(v.SD) }),
            "stat": v=>({ val:v.null+v.z*v.SD,             rearr:"statistic = null + z * SD_null",      sub:"null="+fN(v.null)+", z="+fN(v.z)+", SD="+fN(v.SD) }),
            "null": v=>({ val:v.stat-v.z*v.SD,             rearr:"null = statistic - z * SD_null",      sub:"stat="+fN(v.stat)+", z="+fN(v.z)+", SD="+fN(v.SD) }),
            "SD":   v=>({ val:(v.stat-v.null)/v.z,         rearr:"SD_null = (statistic - null) / z",   sub:"stat="+fN(v.stat)+", null="+fN(v.null)+", z="+fN(v.z) })
          }
        },

        // ── SD of Null — One Proportion ───────────────────────────
        {
          id:"sd_null_prop", name:"SD of Null Distribution — One Proportion",
          formula:"SD_null = sqrt(pi_0 * (1 - pi_0) / n)",
          desc:"Standard deviation of the null distribution for a one-proportion z-test. pi_0 is the null hypothesis proportion. (Course Guide, Lesson 3–5)",
          ref:"CG Lessons 3-5",
          vars:{
            "SD":  { sym:"SD_null", desc:"Std deviation of null distribution", units:["dimensionless"], toBase:[1] },
            "pi0": { sym:"pi_0",    desc:"Null hypothesis proportion",          units:["dimensionless"], toBase:[1] },
            "n":   { sym:"n",       desc:"Sample size",                         units:["count"],         toBase:[1] }
          },
          solvers:{
            "SD":  v=>({ val:Math.sqrt(v.pi0*(1-v.pi0)/v.n),               rearr:"SD_null = sqrt(pi_0*(1-pi_0)/n)",      sub:"pi_0="+fN(v.pi0)+", n="+fN(v.n) }),
            "n":   v=>({ val:v.pi0*(1-v.pi0)/(v.SD*v.SD),                  rearr:"n = pi_0*(1-pi_0) / SD_null^2",        sub:"pi_0="+fN(v.pi0)+", SD_null="+fN(v.SD) }),
            "pi0": v=>({
              val:(function(){
                // Solve pi0*(1-pi0) = SD^2 * n via quadratic: pi0^2 - pi0 + SD^2*n = 0
                var a=1, b=-1, c=v.SD*v.SD*v.n;
                var disc=b*b-4*a*c;
                return disc>=0 ? (-b-Math.sqrt(disc))/(2*a) : NaN;
              })(),
              rearr:"pi_0 = [1 - sqrt(1 - 4*SD^2*n)] / 2  (quadratic solution)",
              sub:"SD_null="+fN(v.SD)+", n="+fN(v.n)
            })
          }
        },

        // ── One-Proportion z-test ─────────────────────────────────
        {
          id:"one_prop_z", name:"One-Proportion z-test",
          formula:"z = (p_hat - pi_0) / sqrt(pi_0*(1-pi_0)/n)",
          desc:"Tests whether sample proportion differs from a null value pi_0. Validity: at least 10 successes AND 10 failures. (Course Guide, Lesson 3–5)",
          ref:"CG Lessons 3-5",
          vars:{
            "z":    { sym:"z",      desc:"Test statistic",                   units:["dimensionless"], toBase:[1] },
            "phat": { sym:"p_hat",  desc:"Sample proportion",                units:["dimensionless"], toBase:[1] },
            "pi0":  { sym:"pi_0",   desc:"Null hypothesis proportion",       units:["dimensionless"], toBase:[1] },
            "n":    { sym:"n",      desc:"Sample size",                      units:["count"],         toBase:[1] }
          },
          solvers:{
            "z":    v=>({ val:(v.phat-v.pi0)/Math.sqrt(v.pi0*(1-v.pi0)/v.n),   rearr:"z = (p_hat - pi_0) / sqrt(pi_0*(1-pi_0)/n)",  sub:"p_hat="+fN(v.phat)+", pi_0="+fN(v.pi0)+", n="+fN(v.n) }),
            "phat": v=>({ val:v.pi0+v.z*Math.sqrt(v.pi0*(1-v.pi0)/v.n),         rearr:"p_hat = pi_0 + z * sqrt(pi_0*(1-pi_0)/n)",    sub:"z="+fN(v.z)+", pi_0="+fN(v.pi0)+", n="+fN(v.n) }),
            "pi0":  v=>({ val:v.phat-v.z*Math.sqrt(v.pi0*(1-v.pi0)/v.n),        rearr:"Rearrange z equation for pi_0 (use solver)",   sub:"p_hat="+fN(v.phat)+", z="+fN(v.z)+", n="+fN(v.n) }),
            "n":    v=>({ val:Math.ceil(v.pi0*(1-v.pi0)*v.z*v.z/Math.pow(v.phat-v.pi0,2)), rearr:"n = pi_0*(1-pi_0)*z^2 / (p_hat-pi_0)^2", sub:"z="+fN(v.z)+", p_hat="+fN(v.phat)+", pi_0="+fN(v.pi0) })
          }
        },

        // ── SD of Null — One Mean ─────────────────────────────────
        {
          id:"sd_null_mean", name:"SD of Null Distribution — One Mean",
          formula:"SD_null = s / sqrt(n)",
          desc:"Standard error of the sample mean. Used in one-sample t-test. s is the sample standard deviation. (Course Guide, Lesson 6–7)",
          ref:"CG Lessons 6-7",
          vars:{
            "SD": { sym:"SD_null", desc:"Standard error of the mean",  units:["dimensionless"], toBase:[1] },
            "s":  { sym:"s",       desc:"Sample standard deviation",    units:["dimensionless"], toBase:[1] },
            "n":  { sym:"n",       desc:"Sample size",                  units:["count"],         toBase:[1] }
          },
          solvers:{
            "SD": v=>({ val:v.s/Math.sqrt(v.n),          rearr:"SD_null = s / sqrt(n)",         sub:"s="+fN(v.s)+", n="+fN(v.n) }),
            "s":  v=>({ val:v.SD*Math.sqrt(v.n),         rearr:"s = SD_null * sqrt(n)",         sub:"SD_null="+fN(v.SD)+", n="+fN(v.n) }),
            "n":  v=>({ val:Math.ceil(v.s*v.s/(v.SD*v.SD)), rearr:"n = (s / SD_null)^2",       sub:"s="+fN(v.s)+", SD_null="+fN(v.SD) })
          }
        },

        // ── One-Sample t-test ─────────────────────────────────────
        {
          id:"one_samp_t", name:"One-Sample t-test",
          formula:"t = (x_bar - mu_0) / (s / sqrt(n))",
          desc:"Tests whether a sample mean differs from a null value mu_0. Degrees of freedom = n-1. Validity: sample not strongly skewed OR n >= 30. (Course Guide, Lesson 6–7)",
          ref:"CG Lessons 6-7",
          vars:{
            "t":    { sym:"t",      desc:"t test statistic",           units:["dimensionless"], toBase:[1] },
            "xbar": { sym:"x_bar",  desc:"Sample mean",                units:["dimensionless"], toBase:[1] },
            "mu0":  { sym:"mu_0",   desc:"Null hypothesis mean",       units:["dimensionless"], toBase:[1] },
            "s":    { sym:"s",      desc:"Sample standard deviation",  units:["dimensionless"], toBase:[1] },
            "n":    { sym:"n",      desc:"Sample size",                units:["count"],         toBase:[1] }
          },
          solvers:{
            "t":    v=>({ val:(v.xbar-v.mu0)/(v.s/Math.sqrt(v.n)),        rearr:"t = (x_bar - mu_0) / (s/sqrt(n))",     sub:"x_bar="+fN(v.xbar)+", mu_0="+fN(v.mu0)+", s="+fN(v.s)+", n="+fN(v.n) }),
            "xbar": v=>({ val:v.mu0+v.t*v.s/Math.sqrt(v.n),               rearr:"x_bar = mu_0 + t*(s/sqrt(n))",         sub:"mu_0="+fN(v.mu0)+", t="+fN(v.t)+", s="+fN(v.s)+", n="+fN(v.n) }),
            "mu0":  v=>({ val:v.xbar-v.t*v.s/Math.sqrt(v.n),              rearr:"mu_0 = x_bar - t*(s/sqrt(n))",         sub:"x_bar="+fN(v.xbar)+", t="+fN(v.t)+", s="+fN(v.s)+", n="+fN(v.n) }),
            "s":    v=>({ val:(v.xbar-v.mu0)*Math.sqrt(v.n)/v.t,          rearr:"s = (x_bar - mu_0)*sqrt(n) / t",       sub:"x_bar="+fN(v.xbar)+", mu_0="+fN(v.mu0)+", t="+fN(v.t)+", n="+fN(v.n) }),
            "n":    v=>({ val:Math.ceil(Math.pow(v.t*v.s/(v.xbar-v.mu0),2)), rearr:"n = (t*s / (x_bar-mu_0))^2",       sub:"t="+fN(v.t)+", s="+fN(v.s)+", x_bar="+fN(v.xbar)+", mu_0="+fN(v.mu0) })
          }
        }

      ] // end significance equations
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 2 — ESTIMATION & COMPARING TWO GROUPS
    // Confidence intervals, two-proportion z-test,
    // two-sample t-test, paired t-test
    // Lessons 8–9, 13–16
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "estimation",
      title: "Estimation & Two Groups",
      desc:  "Confidence intervals, two-proportion z-test, two-sample t-test, paired t-test",
      equations: [

        // ── Confidence Interval — General ────────────────────────
        {
          id:"ci_general", name:"Confidence Interval — General Form",
          formula:"CI = statistic ± multiplier * SE",
          desc:"Every confidence interval has this form. Multiplier from z* (proportion) or t* (mean). SE = standard error. (Course Guide, Lesson 8–9)",
          ref:"CG Lessons 8-9",
          vars:{
            "lower":{ sym:"Lower",      desc:"Lower bound of CI",            units:["dimensionless"], toBase:[1] },
            "upper":{ sym:"Upper",      desc:"Upper bound of CI",            units:["dimensionless"], toBase:[1] },
            "stat": { sym:"statistic",  desc:"Sample statistic (p_hat or x_bar)", units:["dimensionless"], toBase:[1] },
            "mult": { sym:"multiplier", desc:"z* or t* multiplier",          units:["dimensionless"], toBase:[1] },
            "SE":   { sym:"SE",         desc:"Standard error",               units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "lower": v=>({ val:v.stat-v.mult*v.SE,              rearr:"Lower = statistic - multiplier * SE",    sub:"stat="+fN(v.stat)+", mult="+fN(v.mult)+", SE="+fN(v.SE) }),
            "upper": v=>({ val:v.stat+v.mult*v.SE,              rearr:"Upper = statistic + multiplier * SE",    sub:"stat="+fN(v.stat)+", mult="+fN(v.mult)+", SE="+fN(v.SE) }),
            "stat":  v=>({ val:(v.lower+v.upper)/2,             rearr:"statistic = (Lower + Upper) / 2",        sub:"Lower="+fN(v.lower)+", Upper="+fN(v.upper) }),
            "mult":  v=>({ val:(v.upper-v.stat)/v.SE,           rearr:"multiplier = (Upper - statistic) / SE",  sub:"Upper="+fN(v.upper)+", stat="+fN(v.stat)+", SE="+fN(v.SE) }),
            "SE":    v=>({ val:(v.upper-v.stat)/v.mult,         rearr:"SE = (Upper - statistic) / multiplier",  sub:"Upper="+fN(v.upper)+", stat="+fN(v.stat)+", mult="+fN(v.mult) })
          }
        },

        // ── CI for One Proportion ─────────────────────────────────
        {
          id:"ci_prop", name:"Confidence Interval — One Proportion",
          formula:"CI = p_hat ± z* * sqrt(p_hat*(1-p_hat)/n)",
          desc:"95% CI: z*=1.960, 90% CI: z*=1.645, 99% CI: z*=2.576. Validity: at least 10 successes and 10 failures. (Course Guide, Lesson 8–9)",
          ref:"CG Lessons 8-9",
          vars:{
            "phat": { sym:"p_hat", desc:"Sample proportion",                units:["dimensionless"], toBase:[1] },
            "zstar":{ sym:"z*",    desc:"Multiplier (1.645/1.960/2.576)",   units:["dimensionless"], toBase:[1] },
            "n":    { sym:"n",     desc:"Sample size",                      units:["count"],         toBase:[1] },
            "SE":   { sym:"SE",    desc:"Standard error (computed output)", units:["dimensionless"], toBase:[1] },
            "lower":{ sym:"Lower", desc:"Lower bound of CI",                units:["dimensionless"], toBase:[1] },
            "upper":{ sym:"Upper", desc:"Upper bound of CI",                units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "lower": v=>({ val:v.phat-v.zstar*Math.sqrt(v.phat*(1-v.phat)/v.n), rearr:"Lower = p_hat - z* * sqrt(p_hat*(1-p_hat)/n)", sub:"p_hat="+fN(v.phat)+", z*="+fN(v.zstar)+", n="+fN(v.n) }),
            "upper": v=>({ val:v.phat+v.zstar*Math.sqrt(v.phat*(1-v.phat)/v.n), rearr:"Upper = p_hat + z* * sqrt(p_hat*(1-p_hat)/n)", sub:"p_hat="+fN(v.phat)+", z*="+fN(v.zstar)+", n="+fN(v.n) }),
            "SE":    v=>({ val:Math.sqrt(v.phat*(1-v.phat)/v.n),                  rearr:"SE = sqrt(p_hat*(1-p_hat)/n)",                  sub:"p_hat="+fN(v.phat)+", n="+fN(v.n) }),
            "n":    v=>({ val:Math.ceil(v.phat*(1-v.phat)*v.zstar*v.zstar/Math.pow((v.upper-v.phat),2)), rearr:"n = p_hat*(1-p_hat)*z*^2 / (half-width)^2", sub:"p_hat="+fN(v.phat)+", z*="+fN(v.zstar)+", upper="+fN(v.upper) }),
            "phat": v=>({ val:(v.lower+v.upper)/2,                                rearr:"p_hat = (Lower + Upper) / 2",                   sub:"Lower="+fN(v.lower)+", Upper="+fN(v.upper) })
          }
        },

        // ── CI for One Mean ───────────────────────────────────────
        {
          id:"ci_mean", name:"Confidence Interval — One Mean",
          formula:"CI = x_bar ± t* * (s / sqrt(n))",
          desc:"t* from t-distribution with df = n-1. Use qt(1-alpha/2, n-1) in R. Validity: not strongly skewed or n >= 30. (Course Guide, Lesson 8–9)",
          ref:"CG Lessons 8-9",
          vars:{
            "xbar": { sym:"x_bar", desc:"Sample mean",                       units:["dimensionless"], toBase:[1] },
            "tstar":{ sym:"t*",    desc:"t-multiplier (qt(1-alpha/2, n-1))", units:["dimensionless"], toBase:[1] },
            "s":    { sym:"s",     desc:"Sample standard deviation",          units:["dimensionless"], toBase:[1] },
            "n":    { sym:"n",     desc:"Sample size",                        units:["count"],         toBase:[1] },
            "lower":{ sym:"Lower", desc:"Lower bound of CI",                  units:["dimensionless"], toBase:[1] },
            "upper":{ sym:"Upper", desc:"Upper bound of CI",                  units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "lower": v=>({ val:v.xbar-v.tstar*v.s/Math.sqrt(v.n),           rearr:"Lower = x_bar - t* * (s/sqrt(n))",     sub:"x_bar="+fN(v.xbar)+", t*="+fN(v.tstar)+", s="+fN(v.s)+", n="+fN(v.n) }),
            "upper": v=>({ val:v.xbar+v.tstar*v.s/Math.sqrt(v.n),           rearr:"Upper = x_bar + t* * (s/sqrt(n))",     sub:"x_bar="+fN(v.xbar)+", t*="+fN(v.tstar)+", s="+fN(v.s)+", n="+fN(v.n) }),
            "xbar":  v=>({ val:(v.lower+v.upper)/2,                          rearr:"x_bar = (Lower + Upper) / 2",          sub:"Lower="+fN(v.lower)+", Upper="+fN(v.upper) }),
            "tstar": v=>({ val:(v.upper-v.xbar)/(v.s/Math.sqrt(v.n)),       rearr:"t* = (Upper - x_bar) / (s/sqrt(n))",  sub:"Upper="+fN(v.upper)+", x_bar="+fN(v.xbar)+", s="+fN(v.s)+", n="+fN(v.n) }),
            "s":     v=>({ val:(v.upper-v.xbar)*Math.sqrt(v.n)/v.tstar,     rearr:"s = (Upper - x_bar)*sqrt(n) / t*",     sub:"Upper="+fN(v.upper)+", x_bar="+fN(v.xbar)+", n="+fN(v.n)+", t*="+fN(v.tstar) }),
            "n":     v=>({ val:Math.ceil(Math.pow(v.tstar*v.s/(v.upper-v.xbar),2)), rearr:"n = (t*s/half-width)^2",       sub:"t*="+fN(v.tstar)+", s="+fN(v.s)+", upper="+fN(v.upper)+", x_bar="+fN(v.xbar) })
          }
        },

        // ── Two-Proportion z-test ─────────────────────────────────
        {
          id:"two_prop_z", name:"Two-Proportion z-test",
          formula:"z = (p_hat1 - p_hat2 - null) / sqrt(p_hat_T*(1-p_hat_T)*(1/n1+1/n2))",
          desc:"Tests whether two population proportions differ. p_hat_T = pooled proportion. Null usually = 0. Validity: at least 10 in each cell. (Course Guide, Lesson 13–14)",
          ref:"CG Lessons 13-14",
          vars:{
            "z":     { sym:"z",       desc:"Test statistic",                         units:["dimensionless"], toBase:[1] },
            "phat1": { sym:"p_hat_1", desc:"Sample proportion group 1",              units:["dimensionless"], toBase:[1] },
            "phat2": { sym:"p_hat_2", desc:"Sample proportion group 2",              units:["dimensionless"], toBase:[1] },
            "phatT": { sym:"p_hat_T", desc:"Pooled proportion (combined successes/total n)", units:["dimensionless"], toBase:[1] },
            "n1":    { sym:"n_1",     desc:"Sample size group 1",                    units:["count"],         toBase:[1] },
            "n2":    { sym:"n_2",     desc:"Sample size group 2",                    units:["count"],         toBase:[1] },
            "null":  { sym:"null",    desc:"Null hypothesis difference (usually 0)", units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "z": v=>{
              const sd=Math.sqrt(v.phatT*(1-v.phatT)*(1/v.n1+1/v.n2));
              return { val:(v.phat1-v.phat2-v.null)/sd, rearr:"z = (p_hat1-p_hat2-null) / sqrt(p_hat_T*(1-p_hat_T)*(1/n1+1/n2))", sub:"p_hat1="+fN(v.phat1)+", p_hat2="+fN(v.phat2)+", p_hat_T="+fN(v.phatT)+", n1="+fN(v.n1)+", n2="+fN(v.n2) };
            },
            "phatT": v=>{
              const diff=v.phat1-v.phat2-v.null;
              // SD = diff/z, then solve: p*(1-p)*(1/n1+1/n2) = (diff/z)^2
              const SDsq=Math.pow(diff/v.z,2);
              const factor=1/v.n1+1/v.n2;
              const a=1,b=-1,c=SDsq/factor;
              const disc=b*b-4*a*c;
              return { val:disc>=0?(-b-Math.sqrt(disc))/(2*a):NaN, rearr:"p_hat_T = [1-sqrt(1-4*(z-derived SD)^2/(1/n1+1/n2))]/2", sub:"z="+fN(v.z)+", diff="+fN(v.phat1-v.phat2)+", n1="+fN(v.n1)+", n2="+fN(v.n2) };
            },
            "phat1": v=>{
              const sd=Math.sqrt(v.phatT*(1-v.phatT)*(1/v.n1+1/v.n2));
              return { val:v.phat2+v.null+v.z*sd, rearr:"p_hat1 = p_hat2 + null + z*SD_null", sub:"p_hat2="+fN(v.phat2)+", null="+fN(v.null)+", z="+fN(v.z)+", SD="+fN(sd) };
            },
            "phat2": v=>{
              const sd=Math.sqrt(v.phatT*(1-v.phatT)*(1/v.n1+1/v.n2));
              return { val:v.phat1-v.null-v.z*sd, rearr:"p_hat2 = p_hat1 - null - z*SD_null", sub:"p_hat1="+fN(v.phat1)+", null="+fN(v.null)+", z="+fN(v.z)+", SD="+fN(sd) };
            }
          }
        },

        // ── CI for Two Proportions ────────────────────────────────
        {
          id:"ci_two_prop", name:"Confidence Interval — Difference in Two Proportions",
          formula:"CI = (p_hat1 - p_hat2) ± z* * sqrt(p_hat1*(1-p_hat1)/n1 + p_hat2*(1-p_hat2)/n2)",
          desc:"Uses UNpooled SE for CI (not the pooled SE used for the z-test). (Course Guide, Lesson 13–14)",
          ref:"CG Lessons 13-14",
          vars:{
            "phat1": { sym:"p_hat_1", desc:"Sample proportion group 1", units:["dimensionless"], toBase:[1] },
            "phat2": { sym:"p_hat_2", desc:"Sample proportion group 2", units:["dimensionless"], toBase:[1] },
            "n1":    { sym:"n_1",     desc:"Sample size group 1",       units:["count"],         toBase:[1] },
            "n2":    { sym:"n_2",     desc:"Sample size group 2",       units:["count"],         toBase:[1] },
            "zstar": { sym:"z*",      desc:"z-multiplier (1.960 for 95%)", units:["dimensionless"], toBase:[1] },
            "lower": { sym:"Lower",   desc:"Lower bound of CI",         units:["dimensionless"], toBase:[1] },
            "upper": { sym:"Upper",   desc:"Upper bound of CI",         units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "lower": v=>{
              const se=Math.sqrt(v.phat1*(1-v.phat1)/v.n1+v.phat2*(1-v.phat2)/v.n2);
              return { val:(v.phat1-v.phat2)-v.zstar*se, rearr:"Lower = (p1-p2) - z* * SE_unpooled", sub:"p1="+fN(v.phat1)+", p2="+fN(v.phat2)+", z*="+fN(v.zstar)+", n1="+fN(v.n1)+", n2="+fN(v.n2) };
            },
            "upper": v=>{
              const se=Math.sqrt(v.phat1*(1-v.phat1)/v.n1+v.phat2*(1-v.phat2)/v.n2);
              return { val:(v.phat1-v.phat2)+v.zstar*se, rearr:"Upper = (p1-p2) + z* * SE_unpooled", sub:"p1="+fN(v.phat1)+", p2="+fN(v.phat2)+", z*="+fN(v.zstar)+", n1="+fN(v.n1)+", n2="+fN(v.n2) };
            },
            "phat1": v=>({ val:(v.lower+v.upper)/2+v.phat2, rearr:"p_hat1 = (Lower+Upper)/2 + p_hat2", sub:"Lower="+fN(v.lower)+", Upper="+fN(v.upper)+", p2="+fN(v.phat2) }),
            "phat2": v=>({ val:v.phat1-(v.lower+v.upper)/2, rearr:"p_hat2 = p_hat1 - (Lower+Upper)/2", sub:"p1="+fN(v.phat1)+", Lower="+fN(v.lower)+", Upper="+fN(v.upper) })
          }
        },

        // ── Two-Sample t-test ─────────────────────────────────────
        {
          id:"two_samp_t", name:"Two-Sample t-test",
          formula:"t = (x_bar1 - x_bar2 - null) / sqrt(s1^2/n1 + s2^2/n2)",
          desc:"Tests whether two independent group means differ. df = n1+n2-2. Validity: neither group strongly skewed OR both n >= 30. (Course Guide, Lesson 15)",
          ref:"CG Lesson 15",
          vars:{
            "t":     { sym:"t",       desc:"t test statistic",               units:["dimensionless"], toBase:[1] },
            "xbar1": { sym:"x_bar_1", desc:"Sample mean group 1",            units:["dimensionless"], toBase:[1] },
            "xbar2": { sym:"x_bar_2", desc:"Sample mean group 2",            units:["dimensionless"], toBase:[1] },
            "s1":    { sym:"s_1",     desc:"Sample SD group 1",              units:["dimensionless"], toBase:[1] },
            "s2":    { sym:"s_2",     desc:"Sample SD group 2",              units:["dimensionless"], toBase:[1] },
            "n1":    { sym:"n_1",     desc:"Sample size group 1",            units:["count"],         toBase:[1] },
            "n2":    { sym:"n_2",     desc:"Sample size group 2",            units:["count"],         toBase:[1] },
            "null":  { sym:"null",    desc:"Null hypothesis difference (usually 0)", units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "t": v=>{
              const sd=Math.sqrt(v.s1*v.s1/v.n1+v.s2*v.s2/v.n2);
              return { val:(v.xbar1-v.xbar2-v.null)/sd, rearr:"t = (x_bar1-x_bar2-null) / sqrt(s1^2/n1+s2^2/n2)", sub:"x_bar1="+fN(v.xbar1)+", x_bar2="+fN(v.xbar2)+", s1="+fN(v.s1)+", s2="+fN(v.s2)+", n1="+fN(v.n1)+", n2="+fN(v.n2) };
            },
            "xbar1": v=>{
              const sd=Math.sqrt(v.s1*v.s1/v.n1+v.s2*v.s2/v.n2);
              return { val:v.xbar2+v.null+v.t*sd, rearr:"x_bar1 = x_bar2 + null + t*SD", sub:"x_bar2="+fN(v.xbar2)+", t="+fN(v.t)+", SD="+fN(sd) };
            },
            "xbar2": v=>{
              const sd=Math.sqrt(v.s1*v.s1/v.n1+v.s2*v.s2/v.n2);
              return { val:v.xbar1-v.null-v.t*sd, rearr:"x_bar2 = x_bar1 - null - t*SD", sub:"x_bar1="+fN(v.xbar1)+", t="+fN(v.t)+", SD="+fN(sd) };
            },
            "s1": v=>{
              const SDsq=Math.pow((v.xbar1-v.xbar2-v.null)/v.t,2);
              return { val:Math.sqrt(Math.max(0,(SDsq-v.s2*v.s2/v.n2)*v.n1)), rearr:"s1 = sqrt((SD^2 - s2^2/n2)*n1)", sub:"t="+fN(v.t)+", x_bar1="+fN(v.xbar1)+", x_bar2="+fN(v.xbar2)+", s2="+fN(v.s2)+", n1="+fN(v.n1)+", n2="+fN(v.n2) };
            }
          }
        },

        // ── CI for Two Means ──────────────────────────────────────
        {
          id:"ci_two_mean", name:"Confidence Interval — Difference in Two Means",
          formula:"CI = (x_bar1 - x_bar2) ± t* * sqrt(s1^2/n1 + s2^2/n2)",
          desc:"t* uses df = n1+n2-2. Use qt(1-alpha/2, n1+n2-2) in R. (Course Guide, Lesson 15)",
          ref:"CG Lesson 15",
          vars:{
            "xbar1": { sym:"x_bar_1", desc:"Sample mean group 1",              units:["dimensionless"], toBase:[1] },
            "xbar2": { sym:"x_bar_2", desc:"Sample mean group 2",              units:["dimensionless"], toBase:[1] },
            "s1":    { sym:"s_1",     desc:"Sample SD group 1",                units:["dimensionless"], toBase:[1] },
            "s2":    { sym:"s_2",     desc:"Sample SD group 2",                units:["dimensionless"], toBase:[1] },
            "n1":    { sym:"n_1",     desc:"Sample size group 1",              units:["count"],         toBase:[1] },
            "n2":    { sym:"n_2",     desc:"Sample size group 2",              units:["count"],         toBase:[1] },
            "tstar": { sym:"t*",      desc:"t-multiplier (qt(1-alpha/2,n-2))", units:["dimensionless"], toBase:[1] },
            "lower": { sym:"Lower",   desc:"Lower bound of CI",                units:["dimensionless"], toBase:[1] },
            "upper": { sym:"Upper",   desc:"Upper bound of CI",                units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "lower": v=>{
              const se=Math.sqrt(v.s1*v.s1/v.n1+v.s2*v.s2/v.n2);
              return { val:(v.xbar1-v.xbar2)-v.tstar*se, rearr:"Lower = (x_bar1-x_bar2) - t*SE", sub:"x_bar1="+fN(v.xbar1)+", x_bar2="+fN(v.xbar2)+", t*="+fN(v.tstar)+", SE="+fN(se) };
            },
            "upper": v=>{
              const se=Math.sqrt(v.s1*v.s1/v.n1+v.s2*v.s2/v.n2);
              return { val:(v.xbar1-v.xbar2)+v.tstar*se, rearr:"Upper = (x_bar1-x_bar2) + t*SE", sub:"x_bar1="+fN(v.xbar1)+", x_bar2="+fN(v.xbar2)+", t*="+fN(v.tstar)+", SE="+fN(se) };
            },
            "xbar1": v=>({ val:(v.lower+v.upper)/2+v.xbar2, rearr:"x_bar1 = (Lower+Upper)/2 + x_bar2", sub:"Lower="+fN(v.lower)+", Upper="+fN(v.upper)+", x_bar2="+fN(v.xbar2) }),
            "xbar2": v=>({ val:v.xbar1-(v.lower+v.upper)/2, rearr:"x_bar2 = x_bar1 - (Lower+Upper)/2", sub:"x_bar1="+fN(v.xbar1)+", Lower="+fN(v.lower)+", Upper="+fN(v.upper) })
          }
        },

        // ── Paired t-test ─────────────────────────────────────────
        {
          id:"paired_t", name:"Paired t-test",
          formula:"t = (d_bar - null) / (s_d / sqrt(n))",
          desc:"For matched pairs or repeated measures. d_bar = mean difference, s_d = SD of differences. df = n-1. Reduces variability from confounders. (Course Guide, Lesson 16)",
          ref:"CG Lesson 16",
          vars:{
            "t":    { sym:"t",      desc:"t test statistic",               units:["dimensionless"], toBase:[1] },
            "dbar": { sym:"d_bar",  desc:"Mean of paired differences",     units:["dimensionless"], toBase:[1] },
            "null": { sym:"null",   desc:"Null hypothesis (usually 0)",    units:["dimensionless"], toBase:[1] },
            "sd":   { sym:"s_d",    desc:"SD of paired differences",       units:["dimensionless"], toBase:[1] },
            "n":    { sym:"n",      desc:"Number of pairs",                units:["count"],         toBase:[1] }
          },
          solvers:{
            "t":    v=>({ val:(v.dbar-v.null)/(v.sd/Math.sqrt(v.n)),       rearr:"t = (d_bar - null) / (s_d/sqrt(n))", sub:"d_bar="+fN(v.dbar)+", null="+fN(v.null)+", s_d="+fN(v.sd)+", n="+fN(v.n) }),
            "dbar": v=>({ val:v.null+v.t*v.sd/Math.sqrt(v.n),              rearr:"d_bar = null + t*(s_d/sqrt(n))",     sub:"null="+fN(v.null)+", t="+fN(v.t)+", s_d="+fN(v.sd)+", n="+fN(v.n) }),
            "null": v=>({ val:v.dbar-v.t*v.sd/Math.sqrt(v.n),              rearr:"null = d_bar - t*(s_d/sqrt(n))",     sub:"d_bar="+fN(v.dbar)+", t="+fN(v.t)+", s_d="+fN(v.sd)+", n="+fN(v.n) }),
            "sd":   v=>({ val:(v.dbar-v.null)*Math.sqrt(v.n)/v.t,          rearr:"s_d = (d_bar-null)*sqrt(n) / t",     sub:"d_bar="+fN(v.dbar)+", null="+fN(v.null)+", t="+fN(v.t)+", n="+fN(v.n) }),
            "n":    v=>({ val:Math.ceil(Math.pow(v.t*v.sd/(v.dbar-v.null),2)), rearr:"n = (t*s_d/(d_bar-null))^2",    sub:"t="+fN(v.t)+", s_d="+fN(v.sd)+", d_bar="+fN(v.dbar)+", null="+fN(v.null) })
          }
        },

        // ── CI for Paired Mean Difference ─────────────────────────
        {
          id:"ci_paired", name:"Confidence Interval — Paired Mean Difference",
          formula:"CI = d_bar ± t* * (s_d / sqrt(n))",
          desc:"t* uses df = n-1. Paired CI is narrower than two-sample CI when pairing removes between-subject variability. (Course Guide, Lesson 16)",
          ref:"CG Lesson 16",
          vars:{
            "dbar": { sym:"d_bar", desc:"Mean of paired differences",       units:["dimensionless"], toBase:[1] },
            "tstar":{ sym:"t*",    desc:"t-multiplier (qt(1-alpha/2,n-1))", units:["dimensionless"], toBase:[1] },
            "sd":   { sym:"s_d",   desc:"SD of paired differences",         units:["dimensionless"], toBase:[1] },
            "n":    { sym:"n",     desc:"Number of pairs",                  units:["count"],         toBase:[1] },
            "lower":{ sym:"Lower", desc:"Lower bound of CI",                units:["dimensionless"], toBase:[1] },
            "upper":{ sym:"Upper", desc:"Upper bound of CI",                units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "lower": v=>({ val:v.dbar-v.tstar*v.sd/Math.sqrt(v.n),      rearr:"Lower = d_bar - t* * (s_d/sqrt(n))", sub:"d_bar="+fN(v.dbar)+", t*="+fN(v.tstar)+", s_d="+fN(v.sd)+", n="+fN(v.n) }),
            "upper": v=>({ val:v.dbar+v.tstar*v.sd/Math.sqrt(v.n),      rearr:"Upper = d_bar + t* * (s_d/sqrt(n))", sub:"d_bar="+fN(v.dbar)+", t*="+fN(v.tstar)+", s_d="+fN(v.sd)+", n="+fN(v.n) }),
            "dbar":  v=>({ val:(v.lower+v.upper)/2,                      rearr:"d_bar = (Lower + Upper) / 2",         sub:"Lower="+fN(v.lower)+", Upper="+fN(v.upper) }),
            "tstar": v=>({ val:(v.upper-v.dbar)/(v.sd/Math.sqrt(v.n)),  rearr:"t* = (Upper-d_bar) / (s_d/sqrt(n))", sub:"Upper="+fN(v.upper)+", d_bar="+fN(v.dbar)+", s_d="+fN(v.sd)+", n="+fN(v.n) }),
            "sd":    v=>({ val:(v.upper-v.dbar)*Math.sqrt(v.n)/v.tstar, rearr:"s_d = (Upper-d_bar)*sqrt(n) / t*",   sub:"Upper="+fN(v.upper)+", d_bar="+fN(v.dbar)+", n="+fN(v.n)+", t*="+fN(v.tstar) })
          }
        }

      ] // end estimation equations
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 3 — LINEAR REGRESSION
    // Simple linear regression, correlation, multiple regression
    // Lessons 18–21
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "regression",
      title: "Linear Regression",
      desc:  "Correlation, simple linear regression, multiple regression, LINE validity",
      equations: [

        // ── Correlation Coefficient ───────────────────────────────
        {
          id:"correlation", name:"Correlation Coefficient (r)",
          formula:"r = (1/(n-1)) * SUM[(x_i - x_bar)/s_x * (y_i - y_bar)/s_y]",
          desc:"Measures strength and direction of linear association between two quantitative variables. -1 <= r <= 1. Calculated with cor() in R. (Course Guide, Lesson 18)",
          ref:"CG Lesson 18",
          vars:{
            "r":  { sym:"r",    desc:"Correlation coefficient (-1 to 1)", units:["dimensionless"], toBase:[1] },
            "r2": { sym:"R^2",  desc:"Coefficient of determination",      units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "r":  v=>({ val:Math.sign(v.r)*Math.sqrt(Math.abs(v.r2)), rearr:"r = sign(r) * sqrt(R^2)  — note: provide R^2 and sign", sub:"R^2="+fN(v.r2) }),
            "r2": v=>({ val:v.r*v.r,                                   rearr:"R^2 = r^2",                                           sub:"r="+fN(v.r) })
          }
        },

        // ── Regression Slope (b1) ─────────────────────────────────
        {
          id:"reg_slope", name:"Least Squares Slope (b1)",
          formula:"b1 = r * (s_y / s_x)",
          desc:"Slope of the least squares regression line. Calculated by lm() in R. Each 1-unit increase in x is associated with b1 change in predicted y. (Course Guide, Lesson 18)",
          ref:"CG Lesson 18",
          vars:{
            "b1": { sym:"b_1", desc:"Regression slope",                   units:["dimensionless"], toBase:[1] },
            "r":  { sym:"r",   desc:"Correlation coefficient",             units:["dimensionless"], toBase:[1] },
            "sy": { sym:"s_y", desc:"Sample SD of response (y)",          units:["dimensionless"], toBase:[1] },
            "sx": { sym:"s_x", desc:"Sample SD of explanatory (x)",       units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "b1": v=>({ val:v.r*v.sy/v.sx,     rearr:"b1 = r * (s_y / s_x)",  sub:"r="+fN(v.r)+", s_y="+fN(v.sy)+", s_x="+fN(v.sx) }),
            "r":  v=>({ val:v.b1*v.sx/v.sy,    rearr:"r = b1 * (s_x / s_y)",  sub:"b1="+fN(v.b1)+", s_x="+fN(v.sx)+", s_y="+fN(v.sy) }),
            "sy": v=>({ val:v.b1*v.sx/v.r,     rearr:"s_y = b1 * s_x / r",    sub:"b1="+fN(v.b1)+", s_x="+fN(v.sx)+", r="+fN(v.r) }),
            "sx": v=>({ val:v.r*v.sy/v.b1,     rearr:"s_x = r * s_y / b1",    sub:"r="+fN(v.r)+", s_y="+fN(v.sy)+", b1="+fN(v.b1) })
          }
        },

        // ── Regression Intercept (b0) ─────────────────────────────
        {
          id:"reg_intercept", name:"Least Squares Intercept (b0)",
          formula:"b0 = y_bar - b1 * x_bar",
          desc:"y-intercept of the least squares line. The line always passes through (x_bar, y_bar). Calculated by lm() in R. (Course Guide, Lesson 18)",
          ref:"CG Lesson 18",
          vars:{
            "b0":   { sym:"b_0",   desc:"Regression intercept",     units:["dimensionless"], toBase:[1] },
            "ybar": { sym:"y_bar", desc:"Sample mean of y",         units:["dimensionless"], toBase:[1] },
            "b1":   { sym:"b_1",   desc:"Regression slope",         units:["dimensionless"], toBase:[1] },
            "xbar": { sym:"x_bar", desc:"Sample mean of x",         units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "b0":   v=>({ val:v.ybar-v.b1*v.xbar,    rearr:"b0 = y_bar - b1 * x_bar",   sub:"y_bar="+fN(v.ybar)+", b1="+fN(v.b1)+", x_bar="+fN(v.xbar) }),
            "ybar": v=>({ val:v.b0+v.b1*v.xbar,      rearr:"y_bar = b0 + b1 * x_bar",   sub:"b0="+fN(v.b0)+", b1="+fN(v.b1)+", x_bar="+fN(v.xbar) }),
            "b1":   v=>({ val:(v.ybar-v.b0)/v.xbar,  rearr:"b1 = (y_bar - b0) / x_bar", sub:"y_bar="+fN(v.ybar)+", b0="+fN(v.b0)+", x_bar="+fN(v.xbar) }),
            "xbar": v=>({ val:(v.ybar-v.b0)/v.b1,    rearr:"x_bar = (y_bar - b0) / b1", sub:"y_bar="+fN(v.ybar)+", b0="+fN(v.b0)+", b1="+fN(v.b1) })
          }
        },

        // ── Predicted Value ───────────────────────────────────────
        {
          id:"reg_predict", name:"Predicted Value from Regression Line",
          formula:"y_hat = b0 + b1 * x",
          desc:"Use the fitted regression equation to predict y for a given x. Only valid within the range of observed x values (no extrapolation). (Course Guide, Lesson 18)",
          ref:"CG Lesson 18",
          vars:{
            "yhat": { sym:"y_hat", desc:"Predicted response value",   units:["dimensionless"], toBase:[1] },
            "b0":   { sym:"b_0",   desc:"Regression intercept",       units:["dimensionless"], toBase:[1] },
            "b1":   { sym:"b_1",   desc:"Regression slope",           units:["dimensionless"], toBase:[1] },
            "x":    { sym:"x",     desc:"Explanatory variable value", units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "yhat": v=>({ val:v.b0+v.b1*v.x,              rearr:"y_hat = b0 + b1 * x",           sub:"b0="+fN(v.b0)+", b1="+fN(v.b1)+", x="+fN(v.x) }),
            "x":    v=>({ val:(v.yhat-v.b0)/v.b1,          rearr:"x = (y_hat - b0) / b1",         sub:"y_hat="+fN(v.yhat)+", b0="+fN(v.b0)+", b1="+fN(v.b1) }),
            "b0":   v=>({ val:v.yhat-v.b1*v.x,             rearr:"b0 = y_hat - b1 * x",           sub:"y_hat="+fN(v.yhat)+", b1="+fN(v.b1)+", x="+fN(v.x) }),
            "b1":   v=>({ val:(v.yhat-v.b0)/v.x,           rearr:"b1 = (y_hat - b0) / x",         sub:"y_hat="+fN(v.yhat)+", b0="+fN(v.b0)+", x="+fN(v.x) })
          }
        },

        // ── Residual ──────────────────────────────────────────────
        {
          id:"residual", name:"Residual",
          formula:"e = y - y_hat",
          desc:"Residual = observed y minus predicted y_hat. Used to check LINE validity conditions (Linearity, Independence, Normality, Equal Variance). (Course Guide, Lesson 18–21)",
          ref:"CG Lessons 18-21",
          vars:{
            "e":    { sym:"e",     desc:"Residual (observed - predicted)", units:["dimensionless"], toBase:[1] },
            "y":    { sym:"y",     desc:"Observed response value",         units:["dimensionless"], toBase:[1] },
            "yhat": { sym:"y_hat", desc:"Predicted response value",        units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "e":    v=>({ val:v.y-v.yhat,  rearr:"e = y - y_hat",   sub:"y="+fN(v.y)+", y_hat="+fN(v.yhat) }),
            "y":    v=>({ val:v.yhat+v.e,  rearr:"y = y_hat + e",   sub:"y_hat="+fN(v.yhat)+", e="+fN(v.e) }),
            "yhat": v=>({ val:v.y-v.e,     rearr:"y_hat = y - e",   sub:"y="+fN(v.y)+", e="+fN(v.e) })
          }
        },

        // ── Coefficient of Determination (R²) ─────────────────────
        {
          id:"r_squared", name:"Coefficient of Determination (R²)",
          formula:"R^2 = r^2  (simple regression)  /  R^2 = SSR/SST  (general)",
          desc:"Proportion of variability in y explained by the regression model. R²=1 is perfect fit; R²=0 means model explains nothing. (Course Guide, Lesson 18–21)",
          ref:"CG Lessons 18-21",
          vars:{
            "R2":  { sym:"R^2", desc:"Coefficient of determination (0–1)", units:["dimensionless"], toBase:[1] },
            "r":   { sym:"r",   desc:"Correlation coefficient (simple regression only)", units:["dimensionless"], toBase:[1] },
            "SSR": { sym:"SSR", desc:"Sum of squares due to regression",   units:["dimensionless"], toBase:[1] },
            "SST": { sym:"SST", desc:"Total sum of squares",               units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "R2":  v=>({ val:v.r*v.r,        rearr:"R^2 = r^2  (simple regression)",  sub:"r="+fN(v.r) }),
            "r":   v=>({ val:Math.sqrt(v.R2), rearr:"r = sqrt(R^2)  (note: sign of r lost)", sub:"R^2="+fN(v.R2) }),
            "SSR": v=>({ val:v.R2*v.SST,     rearr:"SSR = R^2 * SST",                 sub:"R^2="+fN(v.R2)+", SST="+fN(v.SST) }),
            "SST": v=>({ val:v.SSR/v.R2,     rearr:"SST = SSR / R^2",                 sub:"SSR="+fN(v.SSR)+", R^2="+fN(v.R2) })
          }
        },

        // ── Multiple Regression ───────────────────────────────────
        {
          id:"multi_reg", name:"Multiple Linear Regression Prediction",
          formula:"y_hat = b0 + b1*x1 + b2*x2  (+ ... for more predictors)",
          desc:"General form for multiple regression. Each b_k is the estimated change in y per unit increase in x_k AFTER controlling for all other predictors. Use lm() in R. (Course Guide, Lessons 19–21)",
          ref:"CG Lessons 19-21",
          vars:{
            "yhat": { sym:"y_hat", desc:"Predicted response",        units:["dimensionless"], toBase:[1] },
            "b0":   { sym:"b_0",   desc:"Intercept",                 units:["dimensionless"], toBase:[1] },
            "b1":   { sym:"b_1",   desc:"Coefficient for x1",        units:["dimensionless"], toBase:[1] },
            "x1":   { sym:"x_1",   desc:"First explanatory variable",units:["dimensionless"], toBase:[1] },
            "b2":   { sym:"b_2",   desc:"Coefficient for x2",        units:["dimensionless"], toBase:[1] },
            "x2":   { sym:"x_2",   desc:"Second explanatory variable",units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "yhat": v=>({ val:v.b0+v.b1*v.x1+v.b2*v.x2,           rearr:"y_hat = b0 + b1*x1 + b2*x2",          sub:"b0="+fN(v.b0)+", b1="+fN(v.b1)+", x1="+fN(v.x1)+", b2="+fN(v.b2)+", x2="+fN(v.x2) }),
            "x1":   v=>({ val:(v.yhat-v.b0-v.b2*v.x2)/v.b1,       rearr:"x1 = (y_hat - b0 - b2*x2) / b1",      sub:"y_hat="+fN(v.yhat)+", b0="+fN(v.b0)+", b2="+fN(v.b2)+", x2="+fN(v.x2)+", b1="+fN(v.b1) }),
            "x2":   v=>({ val:(v.yhat-v.b0-v.b1*v.x1)/v.b2,       rearr:"x2 = (y_hat - b0 - b1*x1) / b2",      sub:"y_hat="+fN(v.yhat)+", b0="+fN(v.b0)+", b1="+fN(v.b1)+", x1="+fN(v.x1)+", b2="+fN(v.b2) }),
            "b0":   v=>({ val:v.yhat-v.b1*v.x1-v.b2*v.x2,         rearr:"b0 = y_hat - b1*x1 - b2*x2",          sub:"y_hat="+fN(v.yhat)+", b1="+fN(v.b1)+", x1="+fN(v.x1)+", b2="+fN(v.b2)+", x2="+fN(v.x2) })
          }
        }

      ] // end regression equations
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 4 — PROBABILITY THEORY
    // Conditional probability, Total Probability, Bayes' Theorem,
    // Binomial, Geometric, Normal distributions
    // Lessons 25–29
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "probability",
      title: "Probability Theory",
      desc:  "Conditional probability, Bayes, binomial, geometric, normal distributions",
      equations: [

        // ── Complement Rule ───────────────────────────────────────
        {
          id:"complement", name:"Complement Rule",
          formula:"P(A') = 1 - P(A)",
          desc:"Probability of an event NOT occurring. P(A) + P(A') = 1. (Course Guide, Lessons 25–29)",
          ref:"CG Lessons 25-29",
          vars:{
            "PA":  { sym:"P(A)",  desc:"Probability of event A",           units:["dimensionless"], toBase:[1] },
            "PAc": { sym:"P(A')", desc:"Probability of complement of A",   units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "PAc": v=>({ val:1-v.PA,  rearr:"P(A') = 1 - P(A)",  sub:"P(A)="+fN(v.PA) }),
            "PA":  v=>({ val:1-v.PAc, rearr:"P(A) = 1 - P(A')",  sub:"P(A')="+fN(v.PAc) })
          }
        },

        // ── Multiplication Rule ───────────────────────────────────
        {
          id:"multiplication", name:"Multiplication Rule (General)",
          formula:"P(A ∩ B) = P(B|A) * P(A)  =  P(A|B) * P(B)",
          desc:"Joint probability from conditional probability. Rearranges to give the conditional probability definition. (Course Guide, Lessons 25–29)",
          ref:"CG Lessons 25-29",
          vars:{
            "PAandB":{ sym:"P(A∩B)",  desc:"Joint probability P(A and B)",    units:["dimensionless"], toBase:[1] },
            "PBgA":  { sym:"P(B|A)",  desc:"Conditional prob of B given A",   units:["dimensionless"], toBase:[1] },
            "PA":    { sym:"P(A)",    desc:"Probability of event A",           units:["dimensionless"], toBase:[1] },
            "PAgB":  { sym:"P(A|B)",  desc:"Conditional prob of A given B",   units:["dimensionless"], toBase:[1] },
            "PB":    { sym:"P(B)",    desc:"Probability of event B",           units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "PAandB": v=>({ val:v.PBgA*v.PA,      rearr:"P(A∩B) = P(B|A) * P(A)",  sub:"P(B|A)="+fN(v.PBgA)+", P(A)="+fN(v.PA) }),
            "PBgA":   v=>({ val:v.PAandB/v.PA,    rearr:"P(B|A) = P(A∩B) / P(A)",  sub:"P(A∩B)="+fN(v.PAandB)+", P(A)="+fN(v.PA) }),
            "PA":     v=>({ val:v.PAandB/v.PBgA,  rearr:"P(A) = P(A∩B) / P(B|A)",  sub:"P(A∩B)="+fN(v.PAandB)+", P(B|A)="+fN(v.PBgA) }),
            "PAgB":   v=>({ val:v.PAandB/v.PB,    rearr:"P(A|B) = P(A∩B) / P(B)",  sub:"P(A∩B)="+fN(v.PAandB)+", P(B)="+fN(v.PB) }),
            "PB":     v=>({ val:v.PAandB/v.PAgB,  rearr:"P(B) = P(A∩B) / P(A|B)",  sub:"P(A∩B)="+fN(v.PAandB)+", P(A|B)="+fN(v.PAgB) })
          }
        },

        // ── Total Probability Rule ────────────────────────────────
        {
          id:"total_prob", name:"Total Probability Rule (Two Events)",
          formula:"P(B) = P(B|A)*P(A) + P(B|A')*P(A')",
          desc:"Partitions P(B) over a mutually exclusive and exhaustive partition {A, A'}. Generalizes to k events. (Course Guide, Lessons 25–29)",
          ref:"CG Lessons 25-29",
          vars:{
            "PB":    { sym:"P(B)",   desc:"Total probability of event B",    units:["dimensionless"], toBase:[1] },
            "PBgA":  { sym:"P(B|A)", desc:"P(B given A)",                    units:["dimensionless"], toBase:[1] },
            "PA":    { sym:"P(A)",   desc:"P(A)",                            units:["dimensionless"], toBase:[1] },
            "PBgAc": { sym:"P(B|A')",desc:"P(B given A')",                   units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "PB":    v=>({ val:v.PBgA*v.PA+v.PBgAc*(1-v.PA),               rearr:"P(B) = P(B|A)*P(A) + P(B|A')*(1-P(A))",     sub:"P(B|A)="+fN(v.PBgA)+", P(A)="+fN(v.PA)+", P(B|A')="+fN(v.PBgAc) }),
            "PA":    v=>({ val:(v.PB-v.PBgAc)/(v.PBgA-v.PBgAc),            rearr:"P(A) = (P(B)-P(B|A')) / (P(B|A)-P(B|A'))", sub:"P(B)="+fN(v.PB)+", P(B|A)="+fN(v.PBgA)+", P(B|A')="+fN(v.PBgAc) }),
            "PBgA":  v=>({ val:(v.PB-v.PBgAc*(1-v.PA))/v.PA,               rearr:"P(B|A) = (P(B) - P(B|A')*(1-P(A))) / P(A)", sub:"P(B)="+fN(v.PB)+", P(A)="+fN(v.PA)+", P(B|A')="+fN(v.PBgAc) }),
            "PBgAc": v=>({ val:(v.PB-v.PBgA*v.PA)/(1-v.PA),                rearr:"P(B|A') = (P(B) - P(B|A)*P(A)) / (1-P(A))", sub:"P(B)="+fN(v.PB)+", P(B|A)="+fN(v.PBgA)+", P(A)="+fN(v.PA) })
          }
        },

        // ── Bayes' Theorem ────────────────────────────────────────
        {
          id:"bayes", name:"Bayes' Theorem (Two Events)",
          formula:"P(A|B) = P(B|A)*P(A) / [P(B|A)*P(A) + P(B|A')*P(A')]",
          desc:"Updates prior probability P(A) to posterior P(A|B) given new evidence B. P(A') = 1-P(A). (Course Guide, Lessons 25–29)",
          ref:"CG Lessons 25-29",
          vars:{
            "PAgB":  { sym:"P(A|B)",  desc:"Posterior: P(A given B)",        units:["dimensionless"], toBase:[1] },
            "PBgA":  { sym:"P(B|A)",  desc:"Likelihood: P(B given A)",       units:["dimensionless"], toBase:[1] },
            "PA":    { sym:"P(A)",    desc:"Prior probability of A",          units:["dimensionless"], toBase:[1] },
            "PBgAc": { sym:"P(B|A')", desc:"P(B given A complement)",        units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "PAgB": v=>{
              const num=v.PBgA*v.PA;
              const denom=num+v.PBgAc*(1-v.PA);
              return { val:num/denom, rearr:"P(A|B) = P(B|A)*P(A) / [P(B|A)*P(A) + P(B|A')*(1-P(A))]", sub:"P(B|A)="+fN(v.PBgA)+", P(A)="+fN(v.PA)+", P(B|A')="+fN(v.PBgAc) };
            },
            "PA": v=>{
              // PAgB*(PBgA*PA + PBgAc*(1-PA)) = PBgA*PA
              // Expand and solve for PA
              const val=v.PAgB*v.PBgAc/(v.PBgA-v.PAgB*v.PBgA+v.PAgB*v.PBgAc);
              return { val, rearr:"P(A) solved by rearranging Bayes numerically", sub:"P(A|B)="+fN(v.PAgB)+", P(B|A)="+fN(v.PBgA)+", P(B|A')="+fN(v.PBgAc) };
            },
            "PBgA": v=>{
              // PAgB*(PBgA*PA + PBgAc*(1-PA)) = PBgA*PA
              // PAgB*PBgA*PA + PAgB*PBgAc*(1-PA) = PBgA*PA
              // PAgB*PBgAc*(1-PA) = PBgA*PA*(1-PAgB)
              const val=v.PAgB*v.PBgAc*(1-v.PA)/(v.PA*(1-v.PAgB));
              return { val, rearr:"P(B|A) = P(A|B)*P(B|A')*(1-P(A)) / [P(A)*(1-P(A|B))]", sub:"P(A|B)="+fN(v.PAgB)+", P(A)="+fN(v.PA)+", P(B|A')="+fN(v.PBgAc) };
            }
          }
        },

        // ── Binomial Probability ──────────────────────────────────
        {
          id:"binomial", name:"Binomial Probability P(X = k)",
          formula:"P(X=k) = C(n,k) * pi^k * (1-pi)^(n-k)",
          desc:"Probability of exactly k successes in n independent trials each with probability pi. Use dbinom(k,n,pi) in R. (Course Guide, Lessons 25–29)",
          ref:"CG Lessons 25-29",
          vars:{
            "Pxk": { sym:"P(X=k)", desc:"Probability of exactly k successes", units:["dimensionless"], toBase:[1] },
            "n":   { sym:"n",      desc:"Number of trials",                   units:["count"],         toBase:[1] },
            "k":   { sym:"k",      desc:"Number of successes",                units:["count"],         toBase:[1] },
            "pi":  { sym:"pi",     desc:"Probability of success per trial",   units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "Pxk": v=>{
              // Compute C(n,k) iteratively to avoid overflow
              var n=Math.round(v.n), kk=Math.round(v.k);
              var c=1;
              for(var i=0;i<kk;i++) c=c*(n-i)/(i+1);
              return { val:c*Math.pow(v.pi,kk)*Math.pow(1-v.pi,n-kk), rearr:"P(X=k) = C(n,k) * pi^k * (1-pi)^(n-k)", sub:"n="+fN(v.n)+", k="+fN(v.k)+", pi="+fN(v.pi) };
            },
            "pi": v=>{
              // No closed-form for general k; use numerical note
              return { val:v.k/v.n, rearr:"pi ≈ k/n  (exact MLE; closed form only for k=0 or k=n generally)", sub:"k="+fN(v.k)+", n="+fN(v.n) };
            }
          }
        },

        // ── Binomial Mean & SD ────────────────────────────────────
        {
          id:"binomial_stats", name:"Binomial Mean and Standard Deviation",
          formula:"mu = n*pi  |  sigma = sqrt(n*pi*(1-pi))",
          desc:"Expected value and standard deviation of a binomial random variable X. (Course Guide, Lessons 25–29)",
          ref:"CG Lessons 25-29",
          vars:{
            "mu":    { sym:"mu",    desc:"Expected value (mean)",     units:["dimensionless"], toBase:[1] },
            "sigma": { sym:"sigma", desc:"Standard deviation",        units:["dimensionless"], toBase:[1] },
            "n":     { sym:"n",     desc:"Number of trials",          units:["count"],         toBase:[1] },
            "pi":    { sym:"pi",    desc:"Probability of success",    units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "mu":    v=>({ val:v.n*v.pi,                          rearr:"mu = n * pi",                  sub:"n="+fN(v.n)+", pi="+fN(v.pi) }),
            "sigma": v=>({ val:Math.sqrt(v.n*v.pi*(1-v.pi)),     rearr:"sigma = sqrt(n*pi*(1-pi))",    sub:"n="+fN(v.n)+", pi="+fN(v.pi) }),
            "n":     v=>({ val:v.mu/v.pi,                         rearr:"n = mu / pi",                  sub:"mu="+fN(v.mu)+", pi="+fN(v.pi) }),
            "pi":    v=>({ val:v.mu/v.n,                          rearr:"pi = mu / n",                  sub:"mu="+fN(v.mu)+", n="+fN(v.n) })
          }
        },

        // ── Geometric Probability ─────────────────────────────────
        {
          id:"geometric", name:"Geometric Probability P(Y = k)",
          formula:"P(Y=k) = (1-pi)^(k-1) * pi",
          desc:"Probability that the first success occurs on trial k. Use dgeom(k-1, pi) in R. Mean = 1/pi. (Course Guide, Lessons 25–29)",
          ref:"CG Lessons 25-29",
          vars:{
            "Pyk": { sym:"P(Y=k)", desc:"P(first success on trial k)", units:["dimensionless"], toBase:[1] },
            "k":   { sym:"k",      desc:"Trial number of first success",units:["count"],         toBase:[1] },
            "pi":  { sym:"pi",     desc:"Probability of success",       units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "Pyk": v=>({ val:Math.pow(1-v.pi,v.k-1)*v.pi,          rearr:"P(Y=k) = (1-pi)^(k-1) * pi",    sub:"k="+fN(v.k)+", pi="+fN(v.pi) }),
            "pi":  function(v){
              var p=0.5;
              for(var i=0;i<50;i++){
                var f=Math.pow(1-p,v.k-1)*p-v.Pyk;
                var fp=Math.pow(1-p,v.k-1)-(v.k-1)*Math.pow(1-p,v.k-2)*p;
                if(Math.abs(fp)<1e-12){ break; }
                p=p-f/fp;
                p=Math.max(1e-8,Math.min(1-1e-8,p));
              }
              return { val:p, rearr:"pi solved numerically from (1-pi)^(k-1)*pi = P(Y=k)", sub:"P(Y=k)="+fN(v.Pyk)+", k="+fN(v.k) };
            },
            "k":   v=>({ val:Math.floor(Math.log(v.Pyk/v.pi)/Math.log(1-v.pi))+1, rearr:"k = floor(log(P(Y=k)/pi) / log(1-pi)) + 1  (approx)", sub:"P(Y=k)="+fN(v.Pyk)+", pi="+fN(v.pi) })
          }
        },

        // ── Normal Distribution z-score ───────────────────────────
        {
          id:"normal_z", name:"Normal Distribution z-score",
          formula:"z = (x - mu) / sigma",
          desc:"Standardizes a normal random variable. Use pnorm(z) for area to left of z; qnorm(p) for z given area p. (Course Guide, Lessons 25–29)",
          ref:"CG Lessons 25-29",
          vars:{
            "z":     { sym:"z",     desc:"Standardized z-score",         units:["dimensionless"], toBase:[1] },
            "x":     { sym:"x",     desc:"Observed value",               units:["dimensionless"], toBase:[1] },
            "mu":    { sym:"mu",    desc:"Population mean",              units:["dimensionless"], toBase:[1] },
            "sigma": { sym:"sigma", desc:"Population standard deviation",units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "z":     v=>({ val:(v.x-v.mu)/v.sigma,   rearr:"z = (x - mu) / sigma",    sub:"x="+fN(v.x)+", mu="+fN(v.mu)+", sigma="+fN(v.sigma) }),
            "x":     v=>({ val:v.mu+v.z*v.sigma,      rearr:"x = mu + z * sigma",      sub:"mu="+fN(v.mu)+", z="+fN(v.z)+", sigma="+fN(v.sigma) }),
            "mu":    v=>({ val:v.x-v.z*v.sigma,       rearr:"mu = x - z * sigma",      sub:"x="+fN(v.x)+", z="+fN(v.z)+", sigma="+fN(v.sigma) }),
            "sigma": v=>({ val:(v.x-v.mu)/v.z,        rearr:"sigma = (x - mu) / z",    sub:"x="+fN(v.x)+", mu="+fN(v.mu)+", z="+fN(v.z) })
          }
        },

        // ── Expected Value (Discrete) ─────────────────────────────
        {
          id:"expected_value", name:"Expected Value — Discrete Random Variable",
          formula:"E(X) = mu = SUM[x_i * P(X=x_i)]",
          desc:"Weighted average of all possible values using their probabilities. In R: sum(x * p) or x %*% p. (Course Guide, Lessons 25–29)",
          ref:"CG Lessons 25-29",
          vars:{
            "mu":    { sym:"E(X)",  desc:"Expected value (weighted average)", units:["dimensionless"], toBase:[1] },
            "sumxp": { sym:"SUM(x*p)", desc:"Sum of x_i * P(X=x_i) over all i", units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "mu":    v=>({ val:v.sumxp,  rearr:"E(X) = SUM(x_i * P(X=x_i))",  sub:"SUM(x*p)="+fN(v.sumxp) }),
            "sumxp": v=>({ val:v.mu,     rearr:"SUM(x_i*P(X=x_i)) = E(X)",     sub:"E(X)="+fN(v.mu) })
          }
        },

        // ── Variance (Discrete) ───────────────────────────────────
        {
          id:"variance_discrete", name:"Variance — Discrete Random Variable",
          formula:"Var(X) = sigma^2 = SUM[(x_i - mu)^2 * P(X=x_i)]",
          desc:"Measure of spread for a discrete distribution. In R: sum((x-mu)^2 * p) or ((x-mu)^2) %*% p. (Course Guide, Lessons 25–29)",
          ref:"CG Lessons 25-29",
          vars:{
            "var_x": { sym:"Var(X)",  desc:"Variance",                  units:["dimensionless"], toBase:[1] },
            "sigma": { sym:"sigma",   desc:"Standard deviation",        units:["dimensionless"], toBase:[1] },
            "ssq":   { sym:"SUM[(x-mu)^2*p]", desc:"Variance sum term",units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "var_x": v=>({ val:v.ssq,               rearr:"Var(X) = SUM[(x_i-mu)^2 * P(X=x_i)]",  sub:"SUM[(x-mu)^2*p]="+fN(v.ssq) }),
            "sigma": v=>({ val:Math.sqrt(v.var_x),  rearr:"sigma = sqrt(Var(X))",                   sub:"Var(X)="+fN(v.var_x) }),
            "ssq":   v=>({ val:v.var_x,             rearr:"SUM[(x-mu)^2*p] = Var(X)",               sub:"Var(X)="+fN(v.var_x) })
          }
        }

      ] // end probability equations
    }

  ] // end tabs
}; // end COURSE_MA206

// ================================================================
// Helper — formats numbers cleanly for substitution strings
// (Copied from ev350.js pattern — keep consistent across courses)
// ================================================================
function fN(n) {
  if (!isFinite(n)) return "?";
  if (n === 0) return "0";
  var a = Math.abs(n);
  return (a >= 0.001 && a < 1e7)
    ? parseFloat(n.toPrecision(5)).toString()
    : n.toExponential(3);
}