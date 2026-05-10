// ================================================================
// COURSE TEMPLATE
// Copy this file, rename it to the course ID (e.g. ce301.js)
// Fill in the details below.
// Only edit this file for course updates — never touch index.html
// ================================================================

window.COURSE_XXXX = {
  id:          "xxxx",       // e.g. "ce301"
  code:        "XXXX",       // e.g. "CE301"
  name:        "Course Name",
  description: "Short description of the course",

  tabs: [
    {
      id:    "category1",
      title: "Category Name",
      desc:  "What equations are in this category",
      equations: [
        {
          id:      "eq_id",
          name:    "Equation Name",
          formula: "A = B / C",
          desc:    "What this equation is used for. (EQN X-XX)",
          ref:     "EQN X-XX",
          vars: {
            "A": { sym:"A", desc:"Description of A", units:["unit1","unit2"], toBase:[1, conversionFactor] },
            "B": { sym:"B", desc:"Description of B", units:["unit1"],         toBase:[1] },
            "C": { sym:"C", desc:"Description of C", units:["unit1"],         toBase:[1] }
          },
          solvers: {
            "A": v=>({ val:v.B/v.C,   rearr:"A = B / C", sub:"B="+fN(v.B)+", C="+fN(v.C) }),
            "B": v=>({ val:v.A*v.C,   rearr:"B = A × C", sub:"A="+fN(v.A)+", C="+fN(v.C) }),
            "C": v=>({ val:v.B/v.A,   rearr:"C = B / A", sub:"B="+fN(v.B)+", A="+fN(v.A) })
          }
        }
        // Add more equations here
      ]
    }
    // Add more tabs/categories here
  ]
};