export const kbpy = `# kb.py KB base config
import board
import pog

from kmk.kmk_keyboard import KMKKeyboard as _KMKKeyboard
from kmk.scanners import DiodeOrientation
from kmk.scanners.keypad import KeysScanner

class KMKKeyboard(_KMKKeyboard):
    def __init__(self, features=['basic']):
        if "basic" in features:
            from kmk.modules.layers import Layers; self.modules.append(Layers())
            from kmk.extensions.media_keys import MediaKeys; self.extensions.append(MediaKeys())

        if "serial" in features:
            from pog_serial import pogSerial; self.modules.append(pogSerial())

        if "oneshot" in features:
            from kmk.modules.oneshot import OneShot
            self.oneshot = OneShot()
            self.modules.append(self.oneshot)

        if "tapdance" in features:
            from kmk.modules.tapdance import TapDance
            self.tapdance = TapDance()
            self.modules.append(self.tapdance)

        if "holdtap" in features:
            from kmk.modules.holdtap import HoldTap; self.modules.append(HoldTap())

        if "mousekeys" in features:
            from kmk.modules.mouse_keys import MouseKeys; self.modules.append(MouseKeys())

        if "combos" in features:
            from kmk.modules.combos import Combos, Chord, Sequence
            self.combos = Combos()
            self.modules.append(self.combos)

        # Add your own modules and extensions here
        # or sort them into the correct spot to have the correct import order


        # Encoders
        if pog.hasEncoders:
            from kmk.modules.encoder import EncoderHandler
            self.encoder_handler = EncoderHandler()
            self.encoder_handler.pins = pog.encoders
            self.modules.append(self.encoder_handler)


    # matrix wiring
    if pog.matrixWiring:
        exec("col_pins = (" + pog.colPins + ")")
        exec("row_pins = (" + pog.rowPins + ")")
        exec("diode_orientation = DiodeOrientation." + pog.config["diodeDirection"])

    # direct pin wiring
    if pog.directWiring:
        exec(pog.directPinScanner)

    # coord_mapping
    if len(pog.config["coordMap"]) != 0:
        exec("coord_mapping = [ " + pog.coordMapping + " ]")


`
