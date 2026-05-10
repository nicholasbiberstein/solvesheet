// ================================================================
// MA365 — Engineering Mathematics
// West Point — covering Linear Algebra, Numerical Methods, ODEs,
// Fourier Series, and PDEs (heat, wave, Laplace).
// ================================================================

window.COURSE_MA365 = {
  id:          "ma365",
  code:        "MA365",
  name:        "Engineering Mathematics",
  description: "Linear algebra, numerical methods, ODEs, Fourier series, and PDEs",

  tabs: [

    // ═══════════════════════════════════════════════════════════════
    // TAB 1 — LINEAR ALGEBRA
    // Determinants, inverse, eigenvalues, trace, diagonalization
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "linear_algebra",
      title: "Linear Algebra",
      desc:  "Determinants (2×2 and 3×3), matrix inverse, eigenvalues, eigenvectors, trace, characteristic equation",
      equations: [

        // ── 2×2 Determinant ───────────────────────────────────────
        {
          id:"det2", name:"2×2 Determinant",
          formula:"det(A) = a*d - b*c  for A = [[a,b],[c,d]]",
          desc:"Determinant of a 2×2 matrix. Non-zero ↔ A is invertible (nonsingular). (Lesson 04)",
          ref:"MA365 Lesson 04",
          vars:{
            "det": { sym:"det(A)", desc:"Determinant",  units:["dimensionless"], toBase:[1] },
            "a":   { sym:"a",      desc:"Entry (1,1)",   units:["dimensionless"], toBase:[1] },
            "b":   { sym:"b",      desc:"Entry (1,2)",   units:["dimensionless"], toBase:[1] },
            "c":   { sym:"c",      desc:"Entry (2,1)",   units:["dimensionless"], toBase:[1] },
            "d":   { sym:"d",      desc:"Entry (2,2)",   units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "det": v=>({ val:v.a*v.d-v.b*v.c,   rearr:"det = ad − bc",   sub:"a="+fN(v.a)+", b="+fN(v.b)+", c="+fN(v.c)+", d="+fN(v.d) })
          }
        },

        // ── 2×2 Matrix Inverse ────────────────────────────────────
        {
          id:"inv2", name:"2×2 Matrix Inverse",
          formula:"A^-1 = (1/det(A)) * [[d,-b],[-c,a]]",
          desc:"Inverse of a 2×2 matrix. Exists only if det(A) ≠ 0. A·A⁻¹ = I. (Lesson 04)",
          ref:"MA365 Lesson 04",
          vars:{
            "det": { sym:"det(A)", desc:"Determinant of A (= ad−bc)", units:["dimensionless"], toBase:[1] },
            "a":   { sym:"a",      desc:"Entry (1,1)",                  units:["dimensionless"], toBase:[1] },
            "b":   { sym:"b",      desc:"Entry (1,2)",                  units:["dimensionless"], toBase:[1] },
            "c":   { sym:"c",      desc:"Entry (2,1)",                  units:["dimensionless"], toBase:[1] },
            "d":   { sym:"d",      desc:"Entry (2,2)",                  units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "det": v=>({ val:v.a*v.d-v.b*v.c,   rearr:"det(A) = ad − bc (must ≠ 0 for inverse to exist)",   sub:"a="+fN(v.a)+", b="+fN(v.b)+", c="+fN(v.c)+", d="+fN(v.d) })
          }
        },

        // ── Eigenvalue Characteristic Equation ────────────────────
        {
          id:"char_eq", name:"Characteristic Equation (Eigenvalues)",
          formula:"det(A - lambda*I) = 0",
          desc:"Find eigenvalues λ by solving det(A − λI) = 0. For 2×2: λ² − tr(A)λ + det(A) = 0. (Lesson 05)",
          ref:"MA365 Lesson 05",
          vars:{
            "trA": { sym:"tr(A)",  desc:"Trace of A (sum of diagonal entries)",  units:["dimensionless"], toBase:[1] },
            "det": { sym:"det(A)", desc:"Determinant of A",                       units:["dimensionless"], toBase:[1] },
            "lam1":{ sym:"λ₁",    desc:"Eigenvalue 1",                           units:["dimensionless"], toBase:[1] },
            "lam2":{ sym:"λ₂",    desc:"Eigenvalue 2",                           units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "lam1": v=>({
              val:(v.trA + Math.sqrt(v.trA*v.trA - 4*v.det))/2,
              rearr:"λ = [tr(A) ± √(tr(A)² − 4det(A))] / 2",
              sub:"tr="+fN(v.trA)+", det="+fN(v.det)
            }),
            "lam2": v=>({
              val:(v.trA - Math.sqrt(v.trA*v.trA - 4*v.det))/2,
              rearr:"λ = [tr(A) − √(tr(A)² − 4det(A))] / 2",
              sub:"tr="+fN(v.trA)+", det="+fN(v.det)
            }),
            "trA":  v=>({ val:v.lam1+v.lam2,   rearr:"tr(A) = λ₁ + λ₂",    sub:"λ₁="+fN(v.lam1)+", λ₂="+fN(v.lam2) }),
            "det":  v=>({ val:v.lam1*v.lam2,   rearr:"det(A) = λ₁ × λ₂",   sub:"λ₁="+fN(v.lam1)+", λ₂="+fN(v.lam2) })
          }
        },

        // ── Trace ─────────────────────────────────────────────────
        {
          id:"trace", name:"Trace of a Matrix",
          formula:"tr(A) = sum of diagonal entries = lambda_1 + lambda_2 + ... + lambda_n",
          desc:"Sum of diagonal elements = sum of all eigenvalues. (Lesson 05)",
          ref:"MA365 Lesson 05",
          vars:{
            "trA": { sym:"tr(A)", desc:"Trace",         units:["dimensionless"], toBase:[1] },
            "a11": { sym:"a₁₁",  desc:"Entry (1,1)",   units:["dimensionless"], toBase:[1] },
            "a22": { sym:"a₂₂",  desc:"Entry (2,2)",   units:["dimensionless"], toBase:[1] },
            "a33": { sym:"a₃₃",  desc:"Entry (3,3) — use 0 if 2×2", units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "trA": v=>({ val:v.a11+v.a22+v.a33,   rearr:"tr(A) = a₁₁ + a₂₂ + a₃₃",   sub:"a₁₁="+fN(v.a11)+", a₂₂="+fN(v.a22)+", a₃₃="+fN(v.a33) }),
            "a11": v=>({ val:v.trA-v.a22-v.a33,   rearr:"a₁₁ = tr − a₂₂ − a₃₃",      sub:"tr="+fN(v.trA)+", a₂₂="+fN(v.a22)+", a₃₃="+fN(v.a33) })
          }
        },

        // ── Eigenvalue-Determinant Product ────────────────────────
        {
          id:"det_eig", name:"Determinant = Product of Eigenvalues",
          formula:"det(A) = lambda_1 * lambda_2 * ... * lambda_n",
          desc:"The determinant equals the product of all eigenvalues. (Lesson 05)",
          ref:"MA365 Lesson 05",
          vars:{
            "det":  { sym:"det(A)", desc:"Determinant",   units:["dimensionless"], toBase:[1] },
            "lam1": { sym:"λ₁",    desc:"Eigenvalue 1",  units:["dimensionless"], toBase:[1] },
            "lam2": { sym:"λ₂",    desc:"Eigenvalue 2",  units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "det":  v=>({ val:v.lam1*v.lam2,   rearr:"det(A) = λ₁ × λ₂",   sub:"λ₁="+fN(v.lam1)+", λ₂="+fN(v.lam2) }),
            "lam1": v=>({ val:v.det/v.lam2,    rearr:"λ₁ = det(A) / λ₂",   sub:"det="+fN(v.det)+", λ₂="+fN(v.lam2) }),
            "lam2": v=>({ val:v.det/v.lam1,    rearr:"λ₂ = det(A) / λ₁",   sub:"det="+fN(v.det)+", λ₁="+fN(v.lam1) })
          }
        },

        // ── Diagonalization ───────────────────────────────────────
        {
          id:"diag", name:"Diagonalization: A = PDP⁻¹",
          formula:"A = P * D * P^-1",
          desc:"A is diagonalizable if it has n linearly independent eigenvectors. P = eigenvector matrix, D = diagonal eigenvalue matrix. Requires algebraic multiplicity = geometric multiplicity for each eigenvalue. (Lesson 06)",
          ref:"MA365 Lesson 06",
          vars:{},
          solvers:{}
        },

        // ── Matrix Power via Diagonalization ──────────────────────
        {
          id:"mat_power", name:"Matrix Power via Diagonalization",
          formula:"A^n = P * D^n * P^-1",
          desc:"If A = PDP⁻¹ then Aⁿ = PDⁿP⁻¹. Dⁿ is found by raising each diagonal entry (eigenvalue) to the nth power. (Lesson 06)",
          ref:"MA365 Lesson 06",
          vars:{
            "lam": { sym:"λ",  desc:"Eigenvalue",   units:["dimensionless"], toBase:[1] },
            "n":   { sym:"n",  desc:"Power",         units:["dimensionless"], toBase:[1] },
            "lamn":{ sym:"λⁿ", desc:"Eigenvalue^n", units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "lamn": v=>({ val:Math.pow(v.lam,v.n),    rearr:"λⁿ = λ^n",    sub:"λ="+fN(v.lam)+", n="+fN(v.n) }),
            "lam":  v=>({ val:Math.pow(v.lamn,1/v.n), rearr:"λ = λⁿ^(1/n)", sub:"λⁿ="+fN(v.lamn)+", n="+fN(v.n) }),
            "n":    v=>({ val:Math.log(v.lamn)/Math.log(v.lam), rearr:"n = log(λⁿ)/log(λ)", sub:"λ="+fN(v.lam)+", λⁿ="+fN(v.lamn) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 2 — NUMERICAL METHODS
    // Taylor series, Euler (RK1), Improved Euler (RK2), finite diff
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "numerical",
      title: "Numerical Methods",
      desc:  "Taylor series approximation, Euler method (RK1), Improved Euler (RK2), finite difference formulas",
      equations: [

        // ── Taylor Series ─────────────────────────────────────────
        {
          id:"taylor", name:"Taylor Series (forward)",
          formula:"y(x+h) = y(x) + y'(x)*h + (1/2)*y''(x)*h^2 + (1/6)*y'''(x)*h^3 + O(h^4)",
          desc:"Forward Taylor series expansion about point x with step h = Δx. Higher-order terms = smaller error. (Lesson 07)",
          ref:"MA365 Lesson 07",
          vars:{
            "yNext": { sym:"y_{i+1}", desc:"Next value (approximated)",  units:["(same as y)"], toBase:[1] },
            "yi":    { sym:"yᵢ",      desc:"Current value",              units:["(same as y)"], toBase:[1] },
            "dyi":   { sym:"y'ᵢ",     desc:"Derivative at xᵢ",          units:["(same as y/x)"], toBase:[1] },
            "h":     { sym:"h",       desc:"Step size Δx",               units:["(same as x)"],  toBase:[1] }
          },
          solvers:{
            "yNext": v=>({ val:v.yi+v.dyi*v.h,   rearr:"yᵢ₊₁ ≈ yᵢ + y'ᵢ·h  (1st-order truncation)",   sub:"yᵢ="+fN(v.yi)+", y'ᵢ="+fN(v.dyi)+", h="+fN(v.h) }),
            "h":     v=>({ val:(v.yNext-v.yi)/v.dyi, rearr:"h ≈ (yᵢ₊₁ − yᵢ) / y'ᵢ",                  sub:"yᵢ₊₁="+fN(v.yNext)+", yᵢ="+fN(v.yi)+", y'ᵢ="+fN(v.dyi) })
          }
        },

        // ── Euler Method (RK1) ────────────────────────────────────
        {
          id:"euler", name:"Euler Method (RK1) — 1st-Order IVP",
          formula:"y_{i+1} = y_i + f(x_i, y_i) * h",
          desc:"First-order Runge-Kutta. For IVP y' = f(x,y), y(x₀) = y₀. Error O(h²) per step, O(h) global. (Lesson 07)",
          ref:"MA365 Lesson 07",
          vars:{
            "yNext": { sym:"yᵢ₊₁", desc:"Next approximate value",         units:["(same as y)"],   toBase:[1] },
            "yi":    { sym:"yᵢ",   desc:"Current value",                   units:["(same as y)"],   toBase:[1] },
            "fi":    { sym:"f(xᵢ,yᵢ)", desc:"f evaluated at current point (= y')", units:["(same as y/x)"], toBase:[1] },
            "h":     { sym:"h",    desc:"Step size Δx",                    units:["(same as x)"],   toBase:[1] }
          },
          solvers:{
            "yNext": v=>({ val:v.yi+v.fi*v.h,         rearr:"yᵢ₊₁ = yᵢ + f(xᵢ,yᵢ)·h",   sub:"yᵢ="+fN(v.yi)+", f="+fN(v.fi)+", h="+fN(v.h) }),
            "h":     v=>({ val:(v.yNext-v.yi)/v.fi,    rearr:"h = (yᵢ₊₁ − yᵢ) / f",       sub:"yᵢ₊₁="+fN(v.yNext)+", yᵢ="+fN(v.yi)+", f="+fN(v.fi) }),
            "fi":    v=>({ val:(v.yNext-v.yi)/v.h,     rearr:"f = (yᵢ₊₁ − yᵢ) / h",       sub:"yᵢ₊₁="+fN(v.yNext)+", yᵢ="+fN(v.yi)+", h="+fN(v.h) })
          }
        },

        // ── Improved Euler (RK2) ──────────────────────────────────
        {
          id:"rk2", name:"Improved Euler (RK2 / Heun's Method)",
          formula:"y_{i+1} = y_i + (h/2)*(k1 + k2),  k1 = f(x_i, y_i),  k2 = f(x_{i+1}, y_i + k1*h)",
          desc:"Second-order Runge-Kutta (Heun's method). Error O(h³) per step, O(h²) global — more accurate than Euler. (Lesson 07)",
          ref:"MA365 Lesson 07",
          vars:{
            "yNext": { sym:"yᵢ₊₁", desc:"Next approximate value",   units:["(same as y)"], toBase:[1] },
            "yi":    { sym:"yᵢ",   desc:"Current value",             units:["(same as y)"], toBase:[1] },
            "k1":    { sym:"k₁",   desc:"k₁ = f(xᵢ, yᵢ)",          units:["(same as y/x)"], toBase:[1] },
            "k2":    { sym:"k₂",   desc:"k₂ = f(xᵢ₊₁, yᵢ+k₁h)",   units:["(same as y/x)"], toBase:[1] },
            "h":     { sym:"h",    desc:"Step size",                  units:["(same as x)"], toBase:[1] }
          },
          solvers:{
            "yNext": v=>({ val:v.yi+(v.h/2)*(v.k1+v.k2),   rearr:"yᵢ₊₁ = yᵢ + (h/2)(k₁+k₂)",   sub:"yᵢ="+fN(v.yi)+", h="+fN(v.h)+", k₁="+fN(v.k1)+", k₂="+fN(v.k2) }),
            "h":     v=>({ val:2*(v.yNext-v.yi)/(v.k1+v.k2), rearr:"h = 2(yᵢ₊₁−yᵢ)/(k₁+k₂)",   sub:"yᵢ₊₁="+fN(v.yNext)+", yᵢ="+fN(v.yi)+", k₁="+fN(v.k1)+", k₂="+fN(v.k2) })
          }
        },

        // ── Finite Difference — 1st Derivative (Central) ─────────
        {
          id:"fd1_central", name:"Finite Difference — 1st Derivative (Central)",
          formula:"y'_i ≈ (y_{i+1} - y_{i-1}) / (2*h)",
          desc:"Central difference approximation of the first derivative. Error O(h²). More accurate than one-sided formulas. (Lesson 09)",
          ref:"MA365 Lesson 09",
          vars:{
            "dyi":  { sym:"y'ᵢ",    desc:"First derivative at xᵢ",   units:["(y/x)"],   toBase:[1] },
            "yp":   { sym:"yᵢ₊₁",  desc:"Value at xᵢ₊₁",             units:["(y)"],     toBase:[1] },
            "ym":   { sym:"yᵢ₋₁",  desc:"Value at xᵢ₋₁",             units:["(y)"],     toBase:[1] },
            "h":    { sym:"h",      desc:"Step size Δx",               units:["(x)"],     toBase:[1] }
          },
          solvers:{
            "dyi": v=>({ val:(v.yp-v.ym)/(2*v.h),    rearr:"y'ᵢ = (yᵢ₊₁ − yᵢ₋₁) / (2h)",   sub:"yᵢ₊₁="+fN(v.yp)+", yᵢ₋₁="+fN(v.ym)+", h="+fN(v.h) }),
            "h":   v=>({ val:(v.yp-v.ym)/(2*v.dyi),  rearr:"h = (yᵢ₊₁ − yᵢ₋₁) / (2y'ᵢ)",  sub:"yᵢ₊₁="+fN(v.yp)+", yᵢ₋₁="+fN(v.ym)+", y'ᵢ="+fN(v.dyi) })
          }
        },

        // ── Finite Difference — 2nd Derivative (Central) ─────────
        {
          id:"fd2_central", name:"Finite Difference — 2nd Derivative (Central)",
          formula:"y''_i ≈ (y_{i+1} - 2*y_i + y_{i-1}) / h^2",
          desc:"Central difference approximation of the second derivative. Error O(h²). Used to convert BVPs into linear systems. (Lesson 09)",
          ref:"MA365 Lesson 09",
          vars:{
            "d2yi": { sym:"y''ᵢ",   desc:"Second derivative at xᵢ",  units:["(y/x²)"],  toBase:[1] },
            "yp":   { sym:"yᵢ₊₁",  desc:"Value at xᵢ₊₁",             units:["(y)"],     toBase:[1] },
            "yi":   { sym:"yᵢ",    desc:"Value at xᵢ",                units:["(y)"],     toBase:[1] },
            "ym":   { sym:"yᵢ₋₁",  desc:"Value at xᵢ₋₁",             units:["(y)"],     toBase:[1] },
            "h":    { sym:"h",     desc:"Step size Δx",                units:["(x)"],     toBase:[1] }
          },
          solvers:{
            "d2yi": v=>({ val:(v.yp-2*v.yi+v.ym)/(v.h*v.h),    rearr:"y''ᵢ = (yᵢ₊₁ − 2yᵢ + yᵢ₋₁) / h²",    sub:"yᵢ₊₁="+fN(v.yp)+", yᵢ="+fN(v.yi)+", yᵢ₋₁="+fN(v.ym)+", h="+fN(v.h) }),
            "h":    v=>({ val:Math.sqrt((v.yp-2*v.yi+v.ym)/v.d2yi), rearr:"h = √[(yᵢ₊₁−2yᵢ+yᵢ₋₁)/y''ᵢ]",   sub:"y''ᵢ="+fN(v.d2yi)+", yᵢ₊₁="+fN(v.yp)+", yᵢ="+fN(v.yi)+", yᵢ₋₁="+fN(v.ym) }),
            "yi":   v=>({ val:(v.yp+v.ym-v.d2yi*v.h*v.h)/2,     rearr:"yᵢ = (yᵢ₊₁ + yᵢ₋₁ − y''ᵢ·h²) / 2",  sub:"y''ᵢ="+fN(v.d2yi)+", yᵢ₊₁="+fN(v.yp)+", yᵢ₋₁="+fN(v.ym)+", h="+fN(v.h) })
          }
        },

        // ── Step size ─────────────────────────────────────────────
        {
          id:"step_size", name:"Step Size for Discretization",
          formula:"h = (x_f - x_0) / N",
          desc:"Step size h given N subintervals over [x₀, xf]. Interior points: x₁, x₂, ..., x_{N-1}. (Lessons 07, 09)",
          ref:"MA365 Lesson 07",
          vars:{
            "h":  { sym:"h",   desc:"Step size",          units:["(x)"],           toBase:[1] },
            "xf": { sym:"xf",  desc:"Final x value",      units:["(x)"],           toBase:[1] },
            "x0": { sym:"x₀",  desc:"Initial x value",    units:["(x)"],           toBase:[1] },
            "N":  { sym:"N",   desc:"Number of subintervals", units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "h":  v=>({ val:(v.xf-v.x0)/v.N,        rearr:"h = (xf − x₀) / N",   sub:"xf="+fN(v.xf)+", x₀="+fN(v.x0)+", N="+fN(v.N) }),
            "N":  v=>({ val:(v.xf-v.x0)/v.h,        rearr:"N = (xf − x₀) / h",   sub:"xf="+fN(v.xf)+", x₀="+fN(v.x0)+", h="+fN(v.h) }),
            "xf": v=>({ val:v.x0+v.N*v.h,           rearr:"xf = x₀ + N·h",        sub:"x₀="+fN(v.x0)+", N="+fN(v.N)+", h="+fN(v.h) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 3 — ODEs & STURM-LIOUVILLE
    // 2nd-order ODE solutions, characteristic equation, BVPs
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "odes",
      title: "ODEs & BVPs",
      desc:  "2nd-order ODE characteristic equation, general solutions, hyperbolic functions, Sturm-Liouville eigenvalues",
      equations: [

        // ── Characteristic Equation (2nd-order ODE) ───────────────
        {
          id:"char_ode", name:"Characteristic Equation — 2nd-Order ODE",
          formula:"ay'' + by' + cy = 0  →  ar^2 + br + c = 0",
          desc:"Replace y→eʳˣ to get the characteristic equation. Roots r determine the general solution. (Lesson 16)",
          ref:"MA365 Lesson 16",
          vars:{
            "a":  { sym:"a",  desc:"Coefficient of y''",  units:["dimensionless"], toBase:[1] },
            "b":  { sym:"b",  desc:"Coefficient of y'",   units:["dimensionless"], toBase:[1] },
            "c":  { sym:"c",  desc:"Coefficient of y",    units:["dimensionless"], toBase:[1] },
            "r1": { sym:"r₁", desc:"Root 1 of char. eq.",  units:["dimensionless"], toBase:[1] },
            "r2": { sym:"r₂", desc:"Root 2 of char. eq.",  units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "r1": v=>({ val:(-v.b+Math.sqrt(v.b*v.b-4*v.a*v.c))/(2*v.a),   rearr:"r₁ = [−b + √(b²−4ac)] / 2a",   sub:"a="+fN(v.a)+", b="+fN(v.b)+", c="+fN(v.c) }),
            "r2": v=>({ val:(-v.b-Math.sqrt(v.b*v.b-4*v.a*v.c))/(2*v.a),   rearr:"r₂ = [−b − √(b²−4ac)] / 2a",   sub:"a="+fN(v.a)+", b="+fN(v.b)+", c="+fN(v.c) }),
            "c":  v=>({ val:v.a*v.r1*v.r2,                                   rearr:"c = a·r₁·r₂",                   sub:"a="+fN(v.a)+", r₁="+fN(v.r1)+", r₂="+fN(v.r2) }),
            "b":  v=>({ val:-v.a*(v.r1+v.r2),                                rearr:"b = −a(r₁+r₂)",                 sub:"a="+fN(v.a)+", r₁="+fN(v.r1)+", r₂="+fN(v.r2) })
          }
        },

        // ── Discriminant / Solution type ──────────────────────────
        {
          id:"disc", name:"Discriminant — ODE Solution Type",
          formula:"Delta = b^2 - 4ac",
          desc:"Δ > 0: two real distinct roots (y = C₁eʳ¹ˣ + C₂eʳ²ˣ). Δ = 0: repeated root (y = (C₁+C₂x)eʳˣ). Δ < 0: complex roots α±βi (y = eᵅˣ(C₁cos βx + C₂sin βx)). (Lesson 16)",
          ref:"MA365 Lesson 16",
          vars:{
            "disc": { sym:"Δ",  desc:"Discriminant",        units:["dimensionless"], toBase:[1] },
            "a":    { sym:"a",  desc:"Coefficient of y''",  units:["dimensionless"], toBase:[1] },
            "b":    { sym:"b",  desc:"Coefficient of y'",   units:["dimensionless"], toBase:[1] },
            "c":    { sym:"c",  desc:"Coefficient of y",    units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "disc": v=>({ val:v.b*v.b-4*v.a*v.c,   rearr:"Δ = b² − 4ac",   sub:"b="+fN(v.b)+", a="+fN(v.a)+", c="+fN(v.c) }),
            "c":    v=>({ val:(v.b*v.b-v.disc)/(4*v.a), rearr:"c = (b²−Δ)/(4a)", sub:"b="+fN(v.b)+", Δ="+fN(v.disc)+", a="+fN(v.a) })
          }
        },

        // ── Complex roots: α and β ────────────────────────────────
        {
          id:"complex_roots", name:"Complex Roots α ± βi",
          formula:"alpha = -b/(2a),  beta = sqrt(4ac - b^2) / (2a)",
          desc:"When Δ < 0: roots are α ± βi. General solution: y = eᵅˣ(C₁cos βx + C₂sin βx). (Lesson 16)",
          ref:"MA365 Lesson 16",
          vars:{
            "alp": { sym:"α",  desc:"Real part of root",      units:["dimensionless"], toBase:[1] },
            "bet": { sym:"β",  desc:"Imaginary part of root", units:["dimensionless"], toBase:[1] },
            "a":   { sym:"a",  desc:"Coefficient of y''",     units:["dimensionless"], toBase:[1] },
            "b":   { sym:"b",  desc:"Coefficient of y'",      units:["dimensionless"], toBase:[1] },
            "c":   { sym:"c",  desc:"Coefficient of y",       units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "alp": v=>({ val:-v.b/(2*v.a),                                   rearr:"α = −b/(2a)",               sub:"b="+fN(v.b)+", a="+fN(v.a) }),
            "bet": v=>({ val:Math.sqrt(Math.abs(4*v.a*v.c-v.b*v.b))/(2*v.a), rearr:"β = √|4ac−b²| / (2a)",     sub:"a="+fN(v.a)+", b="+fN(v.b)+", c="+fN(v.c) })
          }
        },

        // ── Hyperbolic functions ──────────────────────────────────
        {
          id:"sinh", name:"Hyperbolic Sine",
          formula:"sinh(x) = (e^x - e^(-x)) / 2",
          desc:"Hyperbolic sine. Used in solutions of y'' − k²y = 0. (Lesson 16)",
          ref:"MA365 Lesson 16",
          vars:{
            "s":  { sym:"sinh(x)", desc:"sinh of x",  units:["dimensionless"], toBase:[1] },
            "x":  { sym:"x",       desc:"Argument",   units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "s": v=>({ val:(Math.exp(v.x)-Math.exp(-v.x))/2,   rearr:"sinh(x) = (eˣ − e⁻ˣ)/2",   sub:"x="+fN(v.x) }),
            "x": v=>({ val:Math.log(v.s+Math.sqrt(v.s*v.s+1)), rearr:"x = ln(sinh + √(sinh²+1))", sub:"sinh="+fN(v.s) })
          }
        },

        // ── Hyperbolic cosine ─────────────────────────────────────
        {
          id:"cosh", name:"Hyperbolic Cosine",
          formula:"cosh(x) = (e^x + e^(-x)) / 2",
          desc:"Hyperbolic cosine. cosh²x − sinh²x = 1. eˣ = cosh x + sinh x. (Lesson 16)",
          ref:"MA365 Lesson 16",
          vars:{
            "ch": { sym:"cosh(x)", desc:"cosh of x",  units:["dimensionless"], toBase:[1] },
            "x":  { sym:"x",       desc:"Argument",   units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "ch": v=>({ val:(Math.exp(v.x)+Math.exp(-v.x))/2,   rearr:"cosh(x) = (eˣ + e⁻ˣ)/2",   sub:"x="+fN(v.x) }),
            "x":  v=>({ val:Math.log(v.ch+Math.sqrt(v.ch*v.ch-1)), rearr:"x = ln(cosh + √(cosh²−1))", sub:"cosh="+fN(v.ch) })
          }
        },

        // ── Sturm-Liouville Eigenvalues ───────────────────────────
        {
          id:"sl_eigen", name:"Sturm-Liouville Eigenvalues — y'' + λy = 0, y(0)=0, y(L)=0",
          formula:"lambda_n = (n*pi/L)^2,  n = 1, 2, 3, ...",
          desc:"Eigenvalues for the Dirichlet BVP. Eigenfunctions: Xₙ(x) = sin(nπx/L). These are the spatial modes used in heat/wave PDE solutions. (Lessons 16, 17)",
          ref:"MA365 Lesson 16",
          vars:{
            "lam": { sym:"λₙ",  desc:"nth eigenvalue",  units:["dimensionless"], toBase:[1] },
            "n":   { sym:"n",   desc:"Mode number (1,2,3,...)", units:["dimensionless"], toBase:[1] },
            "L":   { sym:"L",   desc:"Domain length",    units:["(length)"],      toBase:[1] }
          },
          solvers:{
            "lam": v=>({ val:Math.pow(v.n*Math.PI/v.L, 2),   rearr:"λₙ = (nπ/L)²",   sub:"n="+fN(v.n)+", L="+fN(v.L) }),
            "n":   v=>({ val:Math.sqrt(v.lam)*v.L/Math.PI,   rearr:"n = L√λₙ / π",   sub:"λₙ="+fN(v.lam)+", L="+fN(v.L) }),
            "L":   v=>({ val:v.n*Math.PI/Math.sqrt(v.lam),   rearr:"L = nπ / √λₙ",   sub:"λₙ="+fN(v.lam)+", n="+fN(v.n) })
          }
        },

        // ── Sturm-Liouville Eigenvalues (Neumann) ────────────────
        {
          id:"sl_neumann", name:"Sturm-Liouville Eigenvalues — y''+λy=0, y'(0)=0, y'(L)=0",
          formula:"lambda_n = (n*pi/L)^2,  n = 0, 1, 2, ...",
          desc:"Eigenvalues for Neumann BVP (free-end conditions). n=0 gives λ₀=0, X₀=1 (constant). Eigenfunctions: Xₙ = cos(nπx/L). (Lesson 17)",
          ref:"MA365 Lesson 17",
          vars:{
            "lam": { sym:"λₙ", desc:"nth eigenvalue (n=0,1,2,...)", units:["dimensionless"], toBase:[1] },
            "n":   { sym:"n",  desc:"Mode number (0,1,2,...)",       units:["dimensionless"], toBase:[1] },
            "L":   { sym:"L",  desc:"Domain length",                 units:["(length)"],      toBase:[1] }
          },
          solvers:{
            "lam": v=>({ val:Math.pow(v.n*Math.PI/v.L, 2),   rearr:"λₙ = (nπ/L)²",   sub:"n="+fN(v.n)+", L="+fN(v.L) }),
            "n":   v=>({ val:Math.sqrt(v.lam)*v.L/Math.PI,   rearr:"n = L√λₙ / π",   sub:"λₙ="+fN(v.lam)+", L="+fN(v.L) }),
            "L":   v=>({ val:v.n*Math.PI/Math.sqrt(v.lam),   rearr:"L = nπ / √λₙ",   sub:"λₙ="+fN(v.lam)+", n="+fN(v.n) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 4 — FOURIER SERIES
    // Fourier coefficients, inner product, norms, convergence
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "fourier",
      title: "Fourier Series",
      desc:  "Fourier series coefficients, inner product, orthogonality, norm, half-range expansions",
      equations: [

        // ── Fourier Series (full range) ───────────────────────────
        {
          id:"fourier_full", name:"Fourier Series — Full Range [−L, L]",
          formula:"f(x) = a0/2 + sum[an*cos(n*pi*x/L) + bn*sin(n*pi*x/L)]",
          desc:"Full Fourier series on [−L, L]. Converges to f(x) at continuity points, average at jumps. (Lesson 13)",
          ref:"MA365 Lesson 13",
          vars:{},
          solvers:{}
        },

        // ── Fourier Coefficient a0 ────────────────────────────────
        {
          id:"a0", name:"Fourier Coefficient a₀",
          formula:"a0 = (1/L) * integral[-L to L] f(x) dx",
          desc:"Zeroth Fourier coefficient (twice the average of f over [−L,L]). (Lesson 13)",
          ref:"MA365 Lesson 13",
          vars:{
            "a0": { sym:"a₀",  desc:"Zeroth coefficient",    units:["(same as f)"], toBase:[1] },
            "L":  { sym:"L",   desc:"Half-period",           units:["(x)"],         toBase:[1] },
            "avg":{ sym:"avg", desc:"Average of f over [−L,L] (= (1/2L)∫f dx)", units:["(same as f)"], toBase:[1] }
          },
          solvers:{
            "a0":  v=>({ val:2*v.avg,       rearr:"a₀ = 2 × (average of f over [−L,L])",   sub:"avg="+fN(v.avg) }),
            "avg": v=>({ val:v.a0/2,        rearr:"avg = a₀ / 2",                           sub:"a₀="+fN(v.a0) })
          }
        },

        // ── Inner Product of Functions ────────────────────────────
        {
          id:"inner_prod", name:"Inner Product of Functions",
          formula:"<f,g> = integral[a to b] f(x)*g(x) dx",
          desc:"Functions f and g are orthogonal on [a,b] if ⟨f,g⟩ = 0. Basis for Fourier analysis. (Lesson 13)",
          ref:"MA365 Lesson 13",
          vars:{},
          solvers:{}
        },

        // ── Norm of a Function ────────────────────────────────────
        {
          id:"norm", name:"Norm (L² Norm) of a Function",
          formula:"||f|| = sqrt( integral[a to b] f(x)^2 dx )",
          desc:"L² norm of f on [a,b]. ||f||² = ⟨f,f⟩. For sin(nπx/L) on [0,L]: ||sin(nπx/L)|| = √(L/2). (Lesson 13)",
          ref:"MA365 Lesson 13",
          vars:{
            "norm": { sym:"‖f‖",  desc:"Norm of f",              units:["(same as f)"],  toBase:[1] },
            "norm2":{ sym:"‖f‖²", desc:"Norm squared = ⟨f,f⟩",  units:["(same as f²)"], toBase:[1] }
          },
          solvers:{
            "norm":  v=>({ val:Math.sqrt(v.norm2),   rearr:"‖f‖ = √⟨f,f⟩",   sub:"‖f‖²="+fN(v.norm2) }),
            "norm2": v=>({ val:v.norm*v.norm,         rearr:"‖f‖² = ‖f‖²",    sub:"‖f‖="+fN(v.norm) })
          }
        },

        // ── Sine Half-Range Eigenvalue Sum (Fourier Sine Series) ──
        {
          id:"fourier_sine", name:"Fourier Sine Series — Half Range [0, L]",
          formula:"f(x) = sum_{n=1}^{inf} bn * sin(n*pi*x/L),  bn = (2/L) * integral[0 to L] f(x)*sin(n*pi*x/L) dx",
          desc:"Odd extension of f on [0,L]. Used with Dirichlet BCs (zero endpoints). (Lessons 13, 15)",
          ref:"MA365 Lesson 15",
          vars:{
            "bn":  { sym:"bₙ",  desc:"Sine coefficient",    units:["(same as f)"], toBase:[1] },
            "n":   { sym:"n",   desc:"Mode number",         units:["dimensionless"], toBase:[1] },
            "L":   { sym:"L",   desc:"Domain length",       units:["(x)"],          toBase:[1] }
          },
          solvers:{
            "bn":  v=>({ val:0,   rearr:"bₙ = (2/L) ∫₀ᴸ f(x)·sin(nπx/L) dx  — evaluate integral for specific f(x)",   sub:"n="+fN(v.n)+", L="+fN(v.L) })
          }
        },

        // ── Cosine Half-Range (Fourier Cosine Series) ─────────────
        {
          id:"fourier_cos", name:"Fourier Cosine Series — Half Range [0, L]",
          formula:"f(x) = a0/2 + sum_{n=1}^{inf} an * cos(n*pi*x/L),  an = (2/L) * integral[0 to L] f(x)*cos(n*pi*x/L) dx",
          desc:"Even extension of f on [0,L]. Used with Neumann BCs (zero derivative at endpoints). (Lessons 13, 15)",
          ref:"MA365 Lesson 15",
          vars:{
            "an":  { sym:"aₙ",  desc:"Cosine coefficient",  units:["(same as f)"], toBase:[1] },
            "n":   { sym:"n",   desc:"Mode number",         units:["dimensionless"], toBase:[1] },
            "L":   { sym:"L",   desc:"Domain length",       units:["(x)"],          toBase:[1] }
          },
          solvers:{
            "an":  v=>({ val:0,   rearr:"aₙ = (2/L) ∫₀ᴸ f(x)·cos(nπx/L) dx  — evaluate integral for specific f(x)",   sub:"n="+fN(v.n)+", L="+fN(v.L) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 5 — PDEs: HEAT EQUATION
    // 1D heat equation, separation of variables, Fourier solution
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "heat",
      title: "Heat Equation",
      desc:  "1D heat/diffusion equation — separation of variables solution with Dirichlet and Neumann boundary conditions",
      equations: [

        // ── Heat Equation (PDE) ───────────────────────────────────
        {
          id:"heat_pde", name:"1D Heat (Diffusion) Equation",
          formula:"u_t = k * u_xx,   0 < x < L,  t > 0",
          desc:"∂u/∂t = k·∂²u/∂x². k = thermal diffusivity (k > 0). Parabolic PDE. Solution decays exponentially in time. (Lesson 15)",
          ref:"MA365 Lesson 15",
          vars:{},
          solvers:{}
        },

        // ── Heat Solution (Dirichlet BCs) ─────────────────────────
        {
          id:"heat_sol", name:"Heat Equation Solution — Dirichlet BCs (u=0 at ends)",
          formula:"u(x,t) = sum_{n=1}^{inf} bn * sin(n*pi*x/L) * exp(-k*(n*pi/L)^2 * t)",
          desc:"Solution for u(0,t)=0, u(L,t)=0. bn = Fourier sine coefficients of initial condition u(x,0)=f(x). (Lesson 15)",
          ref:"MA365 Lesson 15",
          vars:{
            "decay": { sym:"e^(−λₙkt)", desc:"Temporal decay factor for mode n", units:["dimensionless"], toBase:[1] },
            "lam":   { sym:"λₙ",        desc:"Eigenvalue = (nπ/L)²",             units:["dimensionless"], toBase:[1] },
            "k":     { sym:"k",         desc:"Thermal diffusivity",               units:["m2/s","cm2/s"], toBase:[1, 0.0001] },
            "t":     { sym:"t",         desc:"Time",                              units:["s","min"],       toBase:[1, 60] }
          },
          solvers:{
            "decay": v=>({ val:Math.exp(-v.lam*v.k*v.t),   rearr:"decay = e^(−λₙ·k·t)",   sub:"λₙ="+fN(v.lam)+", k="+fN(v.k)+", t="+fN(v.t) }),
            "t":     v=>({ val:-Math.log(v.decay)/(v.lam*v.k), rearr:"t = −ln(decay)/(λₙ·k)", sub:"decay="+fN(v.decay)+", λₙ="+fN(v.lam)+", k="+fN(v.k) })
          }
        },

        // ── Heat Equation — Explicit Finite Difference ────────────
        {
          id:"heat_explicit", name:"Heat Equation — Explicit Finite Difference",
          formula:"u_i^{n+1} = u_i^n + k*(dt/dx^2)*(u_{i+1}^n - 2*u_i^n + u_{i-1}^n)",
          desc:"Explicit (forward-time) FD scheme. Stable only when r = k·Δt/(Δx)² ≤ 1/2. (Lesson 12)",
          ref:"MA365 Lesson 12",
          vars:{
            "unext": { sym:"uᵢⁿ⁺¹", desc:"Temperature at next time step",   units:["(T)"],   toBase:[1] },
            "ui":    { sym:"uᵢⁿ",   desc:"Temperature at current node",      units:["(T)"],   toBase:[1] },
            "uip":   { sym:"uᵢ₊₁ⁿ", desc:"Temperature at right neighbor",   units:["(T)"],   toBase:[1] },
            "uim":   { sym:"uᵢ₋₁ⁿ", desc:"Temperature at left neighbor",    units:["(T)"],   toBase:[1] },
            "r":     { sym:"r",     desc:"Stability ratio = k·Δt/(Δx)²",    units:["dimensionless"], toBase:[1] }
          },
          solvers:{
            "unext": v=>({ val:v.ui+v.r*(v.uip-2*v.ui+v.uim),   rearr:"uᵢⁿ⁺¹ = uᵢⁿ + r(uᵢ₊₁ⁿ − 2uᵢⁿ + uᵢ₋₁ⁿ)",   sub:"uᵢ="+fN(v.ui)+", r="+fN(v.r)+", uᵢ₊₁="+fN(v.uip)+", uᵢ₋₁="+fN(v.uim) }),
            "r":     v=>({ val:(v.unext-v.ui)/(v.uip-2*v.ui+v.uim), rearr:"r = (uᵢⁿ⁺¹−uᵢⁿ)/(uᵢ₊₁ⁿ−2uᵢⁿ+uᵢ₋₁ⁿ)",   sub:"uᵢⁿ⁺¹="+fN(v.unext)+", uᵢ="+fN(v.ui)+", uᵢ₊₁="+fN(v.uip)+", uᵢ₋₁="+fN(v.uim) })
          }
        },

        // ── Stability Ratio ───────────────────────────────────────
        {
          id:"stability_r", name:"Stability Ratio — Explicit Heat FD",
          formula:"r = k * dt / dx^2  (must be ≤ 1/2 for stability)",
          desc:"Stability condition for explicit FD applied to heat equation. If r > 1/2, solution blows up. (Lesson 12)",
          ref:"MA365 Lesson 12",
          vars:{
            "r":  { sym:"r",  desc:"Stability ratio",    units:["dimensionless"], toBase:[1] },
            "k":  { sym:"k",  desc:"Thermal diffusivity", units:["m2/s"],         toBase:[1] },
            "dt": { sym:"Δt", desc:"Time step",           units:["s"],             toBase:[1] },
            "dx": { sym:"Δx", desc:"Spatial step",        units:["m"],             toBase:[1] }
          },
          solvers:{
            "r":  v=>({ val:v.k*v.dt/(v.dx*v.dx),   rearr:"r = k·Δt / Δx²",    sub:"k="+fN(v.k)+", Δt="+fN(v.dt)+", Δx="+fN(v.dx) }),
            "dt": v=>({ val:v.r*v.dx*v.dx/v.k,      rearr:"Δt = r·Δx² / k",    sub:"r="+fN(v.r)+", Δx="+fN(v.dx)+", k="+fN(v.k) }),
            "dx": v=>({ val:Math.sqrt(v.k*v.dt/v.r), rearr:"Δx = √(k·Δt / r)", sub:"k="+fN(v.k)+", Δt="+fN(v.dt)+", r="+fN(v.r) }),
            "k":  v=>({ val:v.r*v.dx*v.dx/v.dt,     rearr:"k = r·Δx² / Δt",    sub:"r="+fN(v.r)+", Δx="+fN(v.dx)+", Δt="+fN(v.dt) })
          }
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TAB 6 — WAVE EQUATION & LAPLACE'S EQUATION
    // Wave equation, normal modes, Laplace
    // ═══════════════════════════════════════════════════════════════
    {
      id:    "wave_laplace",
      title: "Wave & Laplace",
      desc:  "1D wave equation — normal modes, wave speed, frequencies; Laplace equation — steady-state solutions",
      equations: [

        // ── Wave Equation ─────────────────────────────────────────
        {
          id:"wave_pde", name:"1D Wave Equation",
          formula:"u_tt = a^2 * u_xx,  0 < x < L,  t > 0",
          desc:"∂²u/∂t² = a²·∂²u/∂x². a = wave speed = √(T₀/ρ) for a string. Hyperbolic PDE. (Lessons 21, 22)",
          ref:"MA365 Lesson 21",
          vars:{},
          solvers:{}
        },

        // ── Wave speed from tension/density ──────────────────────
        {
          id:"wave_speed", name:"Wave Speed on a String",
          formula:"a = sqrt(T0 / rho)",
          desc:"Wave speed a for a vibrating string. T₀ = tension, ρ = linear mass density. (Lesson 22)",
          ref:"MA365 Lesson 22",
          vars:{
            "a":   { sym:"a",  desc:"Wave speed",            units:["m/s","ft/s"], toBase:[1, 0.3048] },
            "T0":  { sym:"T₀", desc:"Tension in string",     units:["N","lb"],     toBase:[1, 4.44822] },
            "rho": { sym:"ρ",  desc:"Linear mass density",   units:["kg/m"],       toBase:[1] }
          },
          solvers:{
            "a":   v=>({ val:Math.sqrt(v.T0/v.rho),   rearr:"a = √(T₀/ρ)",    sub:"T₀="+fN(v.T0)+", ρ="+fN(v.rho) }),
            "T0":  v=>({ val:v.a*v.a*v.rho,           rearr:"T₀ = a²·ρ",      sub:"a="+fN(v.a)+", ρ="+fN(v.rho) }),
            "rho": v=>({ val:v.T0/(v.a*v.a),          rearr:"ρ = T₀ / a²",    sub:"T₀="+fN(v.T0)+", a="+fN(v.a) })
          }
        },

        // ── Wave Normal Mode Frequency ────────────────────────────
        {
          id:"wave_freq", name:"Normal Mode Frequencies (Wave Equation)",
          formula:"omega_n = n * pi * a / L,  f_n = omega_n / (2*pi) = n*a/(2*L)",
          desc:"Natural frequencies of a vibrating string of length L with fixed ends. n=1 is the fundamental. (Lesson 22)",
          ref:"MA365 Lesson 22",
          vars:{
            "fn":  { sym:"fₙ",  desc:"nth harmonic frequency",  units:["Hz","rad/s"], toBase:[1] },
            "n":   { sym:"n",   desc:"Mode number (1,2,3,...)", units:["dimensionless"], toBase:[1] },
            "a":   { sym:"a",   desc:"Wave speed",              units:["m/s"],          toBase:[1] },
            "L":   { sym:"L",   desc:"String length",           units:["m","ft"],        toBase:[1, 0.3048] }
          },
          solvers:{
            "fn":  v=>({ val:v.n*v.a/(2*v.L),   rearr:"fₙ = na/(2L)",    sub:"n="+fN(v.n)+", a="+fN(v.a)+", L="+fN(v.L) }),
            "a":   v=>({ val:2*v.L*v.fn/v.n,    rearr:"a = 2Lfₙ/n",     sub:"n="+fN(v.n)+", fₙ="+fN(v.fn)+", L="+fN(v.L) }),
            "L":   v=>({ val:v.n*v.a/(2*v.fn),  rearr:"L = na/(2fₙ)",   sub:"n="+fN(v.n)+", a="+fN(v.a)+", fₙ="+fN(v.fn) }),
            "n":   v=>({ val:2*v.L*v.fn/v.a,    rearr:"n = 2Lfₙ/a",     sub:"L="+fN(v.L)+", fₙ="+fN(v.fn)+", a="+fN(v.a) })
          }
        },

        // ── Wave Solution (Fourier) ───────────────────────────────
        {
          id:"wave_sol", name:"Wave Equation Solution — Dirichlet BCs",
          formula:"u(x,t) = sum [An*cos(omega_n*t) + Bn*sin(omega_n*t)] * sin(n*pi*x/L)",
          desc:"General solution with u(0,t)=0, u(L,t)=0. Aₙ from IC u(x,0)=F(x), Bₙ from IC uₜ(x,0)=G(x). (Lessons 21, 22)",
          ref:"MA365 Lesson 22",
          vars:{},
          solvers:{}
        },

        // ── Laplace's Equation ────────────────────────────────────
        {
          id:"laplace_pde", name:"Laplace's Equation (∇²u = 0)",
          formula:"u_xx + u_yy = 0  (2D steady state)",
          desc:"Elliptic PDE. Models steady-state temperature, electrostatics, fluid potential. Solution is a harmonic function. (Lesson 28)",
          ref:"MA365 Lesson 28",
          vars:{},
          solvers:{}
        },

        // ── Laplace solution — rectangular domain ─────────────────
        {
          id:"laplace_rect", name:"Laplace — Rectangular Domain Solution (Homogeneous sides)",
          formula:"u(x,y) = sum [Cn * sinh(n*pi*y/a)] * sin(n*pi*x/a)",
          desc:"For uxx + uyy = 0 on 0<x<a, 0<y<b with u=0 on three sides and u(x,b)=f(x). Cₙ found from Fourier sine series of f(x)/sinh(nπb/a). (Lesson 28)",
          ref:"MA365 Lesson 28",
          vars:{
            "argsh": { sym:"sinh(nπy/a)", desc:"Hyperbolic sine growth factor",  units:["dimensionless"], toBase:[1] },
            "n":     { sym:"n",           desc:"Mode number",                    units:["dimensionless"], toBase:[1] },
            "y":     { sym:"y",           desc:"y coordinate",                   units:["(length)"],      toBase:[1] },
            "a":     { sym:"a",           desc:"Width of domain",                units:["(length)"],      toBase:[1] }
          },
          solvers:{
            "argsh": v=>({ val:(Math.exp(v.n*Math.PI*v.y/v.a)-Math.exp(-v.n*Math.PI*v.y/v.a))/2,
              rearr:"sinh(nπy/a) = (e^(nπy/a) − e^(−nπy/a))/2",   sub:"n="+fN(v.n)+", y="+fN(v.y)+", a="+fN(v.a) })
          }
        }
      ]
    }

  ]
};