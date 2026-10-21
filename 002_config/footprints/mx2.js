// Any MX switch
// Nets
//    from: corresponds to pin 1
//    to: corresponds to pin 2
// Params
//    hotswap: default is false
//      if true, will include holes and pads for Kailh MX hotswap sockets
//    reverse: default is false
//      if true, will flip the footprint such that the pcb can be reversible 
//    keycaps: default is false
//      if true, will add choc sized keycap box around the footprint
//    scale: default is [1, 1]
//      multiplier array [scaleX, scaleY] to scale up/down the user drawing outlines (keeps PCB pads/holes unchanged)
//
// note: hotswap and reverse can be used simultaneously

module.exports = {
  params: {
    designator: 'S',
    hotswap: false,
    reverse: false,
    keycaps: false,
    scale: [1, 1], // 默认缩放倍率 [X, Y]，可传入 [1.2, 1.2] 或单数字 1.2
    from: undefined,
    to: undefined
  },
  body: p => {
    // 处理 scale 参数：允许传入数组 [sx, sy] 或单个数字 number
    let sx = 1, sy = 1;
    if (Array.isArray(p.scale)) {
      sx = p.scale[0] ?? 1;
      sy = p.scale[1] ?? 1;
    } else if (typeof p.scale === 'number') {
      sx = p.scale;
      sy = p.scale;
    }

    const standard = `
      (module MX (layer F.Cu) (tedit 5DD4F656)
      ${p.at /* parametric position */}

      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
      (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))

      ${''/* corner marks - 按照 sx, sy 缩放 */}
      (fp_line (start ${-7 * sx} ${-6 * sy}) (end ${-7 * sx} ${-7 * sy}) (layer Dwgs.User) (width 0.15))
      (fp_line (start ${-7 * sx} ${7 * sy}) (end ${-6 * sx} ${7 * sy}) (layer Dwgs.User) (width 0.15))
      (fp_line (start ${-6 * sx} ${-7 * sy}) (end ${-7 * sx} ${-7 * sy}) (layer Dwgs.User) (width 0.15))
      (fp_line (start ${-7 * sx} ${7 * sy}) (end ${-7 * sx} ${6 * sy}) (layer Dwgs.User) (width 0.15))
      (fp_line (start ${7 * sx} ${6 * sy}) (end ${7 * sx} ${7 * sy}) (layer Dwgs.User) (width 0.15))
      (fp_line (start ${7 * sx} ${-7 * sy}) (end ${6 * sx} ${-7 * sy}) (layer Dwgs.User) (width 0.15))
      (fp_line (start ${6 * sx} ${7 * sy}) (end ${7 * sx} ${7 * sy}) (layer Dwgs.User) (width 0.15))
      (fp_line (start ${7 * sx} ${-7 * sy}) (end ${7 * sx} ${-6 * sy}) (layer Dwgs.User) (width 0.15))
    
      ${''/* middle shaft - 物理尺寸保持不变 */}
      (pad "" np_thru_hole circle (at 0 0) (size 3.9878 3.9878) (drill 3.9878) (layers *.Cu *.Mask))

      ${''/* stabilizers - 物理尺寸保持不变 */}
      (pad "" np_thru_hole circle (at 5.08 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
      (pad "" np_thru_hole circle (at -5.08 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
      `
    
    const keycap = `
      ${'' /* keycap marks - 按照 sx, sy 缩放 */}
      (fp_line (start ${-9.5 * sx} ${-9.5 * sy}) (end ${9.5 * sx} ${-9.5 * sy}) (layer Dwgs.User) (width 0.15))
      (fp_line (start ${9.5 * sx} ${-9.5 * sy}) (end ${9.5 * sx} ${9.5 * sy}) (layer Dwgs.User) (width 0.15))
      (fp_line (start ${9.5 * sx} ${9.5 * sy}) (end ${-9.5 * sx} ${9.5 * sy}) (layer Dwgs.User) (width 0.15))
      (fp_line (start ${-9.5 * sx} ${9.5 * sy}) (end ${-9.5 * sx} ${-9.5 * sy}) (layer Dwgs.User) (width 0.15))
      `

    function pins(def_neg, def_pos, def_side) {
      if(p.hotswap) {
        return `
        ${'' /* holes */}
        (pad "" np_thru_hole circle (at ${def_pos}2.54 -5.08) (size 3 3) (drill 3) (layers *.Cu *.Mask))
        (pad "" np_thru_hole circle (at ${def_neg}3.81 -2.54) (size 3 3) (drill 3) (layers *.Cu *.Mask))
        
        ${'' /* net pads */}
        (pad 1 smd rect (at ${def_neg}7.085 -2.54 ${p.r}) (size 2.55 2.5) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${p.from})
        (pad 2 smd rect (at ${def_pos}5.842 -5.08 ${p.r}) (size 2.55 2.5) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${p.to})
        `
      } else {
          return `
            ${''/* pins */}
            (pad 1 thru_hole circle (at ${def_pos}2.54 -5.08) (size 2.286 2.286) (drill 1.4986) (layers *.Cu *.Mask) ${p.from})
            (pad 2 thru_hole circle (at ${def_neg}3.81 -2.54) (size 2.286 2.286) (drill 1.4986) (layers *.Cu *.Mask) ${p.to})
          `
      }
    }

    if(p.reverse){
      return `
        ${standard}
        ${p.keycaps ? keycap : ''}
        ${pins('-', '', 'B')}
        ${pins('', '-', 'F')})
        `
    } else {
      return `
        ${standard}
        ${p.keycaps ? keycap : ''}
        ${pins('-', '', 'B')})
        `
    }
  }
}
