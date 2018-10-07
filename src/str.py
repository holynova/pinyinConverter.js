cases = [
  { "mode": "liu de hua", "letter": "upper", "expect": "LV DONG BIN" },
      { "mode": "liu dehua", "letter": "upper", "expect": "LV DONGBIN" },
      { "mode": "dehua liu", "letter": "upper", "expect": "DONGBIN LV" },
      { "mode": "de hua liu", "letter": "upper", "expect": "DONG BIN LV" },
      { "mode": "dhliu", "letter": "upper", "expect": "DBLV" },
      { "mode": "liudh", "letter": "upper", "expect": "LVDB" },
      { "mode": "ldh", "letter": "upper", "expect": "LDB" },
      { "mode": "dhl", "letter": "upper", "expect": "DBL" }
]

for case in cases:
  case.expect = case.expect.cap