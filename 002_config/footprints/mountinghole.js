module.exports = {
  params: {
    class: 'HOLE',
  },
  body: p => `
    (module HOLE_M2_TH (layer F.Cu) (tedit 5A52E4A3)
      ${p.at /* parametric position */}
      ${'' /* footprint reference */}

      (pad "" np_thru_hole circle (at 0 0 90) (size 4.5 4.5) (drill 4.5) (layers *.Cu *.Mask F.SilkS) (clearance 0.3)))
  `
}
