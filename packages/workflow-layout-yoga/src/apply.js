import * as yoga from 'yoga-layout';

const identity = x => x;

const autoStyles = ['setHeight', 'setWidth', 'setMargin'];

const percentStyles = [
  'setFlexBasis',
  'setHeight',
  'setMargin',
  'setMaxHeight',
  'setMaxWidth',
  'setMinWidth',
  'setMinWidth',
  'setPadding',
  'setPosition',
];

export default function apply(node, style, value) {
  if (!mapping.hasOwnProperty(style)) {
    throw new Error('Unknown style:', style);
  }

  let [setter, mapper, argument] = mapping[style] || [];

  if (value === 'auto' && autoStyles.includes(setter)) {
    setter += 'Auto';
  } else if (
    typeof value === 'string' &&
    value.slice(-1) === '%' &&
    percentStyles.includes(setter)
  ) {
    setter += 'Percent';
    value = parseInt(value.slice(0, -1));
  }

  if (argument) {
    node[setter](argument, mapper(value));
  } else {
    node[setter](mapper(value));
  }
}

const mapping = {
  alignContent: ['setAlignContent', alignValue],
  alignItems: ['setAlignItems', alignValue],
  alignSelf: ['setAlignSelf', alignValue],
  aspectRatio: ['setAspectRatio', pointValue],
  borderBottomWidth: ['setBorder', pointValue, yoga.EDGE_BOTTOM],
  borderEndWidth: ['setBorder', pointValue, yoga.EDGE_END],
  borderLeftWidth: ['setBorder', pointValue, yoga.EDGE_LEFT],
  borderRightWidth: ['setBorder', pointValue, yoga.EDGE_RIGHT],
  borderStartWidth: ['setBorder', pointValue, yoga.EDGE_START],
  borderTopWidth: ['setBorder', pointValue, yoga.EDGE_TOP],
  borderWidth: ['setBorder', pointValue, yoga.EDGE_ALL],
  bottom: ['setPosition', pointValue, yoga.EDGE_BOTTOM],
  direction: ['setDirection', directionValue],
  display: ['setDisplay', displayValue],
  end: ['setPosition', pointValue, yoga.EDGE_END],
  flex: ['setFlex', identity],
  flexBasis: ['setFlexBasis', pointValue],
  flexDirection: ['setFlexDirection', flexDirectionValue],
  flexGrow: ['setFlexGrow', identity],
  flexShrink: ['setFlexShrink', identity],
  flexWrap: ['setFlexWrap', wrapValue],
  height: ['setHeight', pointValue],
  justifyContent: ['setJustifyContent', justifyValue],
  left: ['setPosition', pointValue, yoga.EDGE_LEFT],
  margin: ['setMargin', pointValue, yoga.EDGE_ALL],
  marginBottom: ['setMargin', pointValue, yoga.EDGE_BOTTOM],
  marginEnd: ['setMargin', pointValue, yoga.EDGE_END],
  marginHorizontal: ['setMargin', pointValue, yoga.EDGE_HORIZONTAL],
  marginLeft: ['setMargin', pointValue, yoga.EDGE_LEFT],
  marginRight: ['setMargin', pointValue, yoga.EDGE_RIGHT],
  marginStart: ['setMargin', pointValue, yoga.EDGE_START],
  marginTop: ['setMargin', pointValue, yoga.EDGE_TOP],
  marginVertical: ['setMargin', pointValue, yoga.EDGE_VERTICAL],
  maxHeight: ['setMaxHeight', identity],
  maxWidth: ['setMaxWidth', identity],
  minHeight: ['setMinHeight', identity],
  minWidth: ['setMinWidth', identity],
  overflow: ['setOverflow', overflowValue],
  padding: ['setPadding', pointValue, yoga.EDGE_ALL],
  paddingBottom: ['setPadding', pointValue, yoga.EDGE_BOTTOM],
  paddingEnd: ['setPadding', pointValue, yoga.EDGE_END],
  paddingHorizontal: ['setPadding', pointValue, yoga.EDGE_HORIZONTAL],
  paddingLeft: ['setPadding', pointValue, yoga.EDGE_LEFT],
  paddingRight: ['setPadding', pointValue, yoga.EDGE_RIGHT],
  paddingStart: ['setPadding', pointValue, yoga.EDGE_START],
  paddingTop: ['setPadding', pointValue, yoga.EDGE_TOP],
  paddingVertical: ['setPadding', pointValue, yoga.EDGE_VERTICAL],
  position: ['setPositionType', positionValue],
  right: ['setPosition', yoga.EDGE_RIGHT, pointValue],
  start: ['setPosition', yoga.EDGE_START, pointValue],
  top: ['setPosition', yoga.EDGE_TOP, pointValue],
  width: ['setWidth', pointValue],
  zIndex: ['setZIndex'],
};

function overflowValue(value) {
  switch (value) {
    case 'visible':
      return yoga.OVERFLOW_VISIBLE;
    case 'hidden':
      return yoga.OVERFLOW_HIDDEN;
    case 'scroll':
      return yoga.OVERFLOW_SCROLL;
  }
}

function wrapValue(value) {
  switch (value) {
    case 'wrap':
      return yoga.WRAP_WRAP;
    case 'wrap-reverse':
      return yoga.WRAP_WRAP_REVERSE;
    case 'nowrap':
      return yoga.WRAP_NO_WRAP;
  }
}

function flexDirectionValue(value) {
  switch (value) {
    case 'row':
      return yoga.FLEX_DIRECTION_ROW;
    case 'row-reverse':
      return yoga.FLEX_DIRECTION_ROW_REVERSE;
    case 'column':
      return yoga.FLEX_DIRECTION_COLUMN;
    case 'column-reverse':
      return yoga.FLEX_DIRECTION_COLUMN_REVERSE;
  }
}

function justifyValue(value) {
  switch (value) {
    case 'center':
      return yoga.JUSTIFY_COUNT;
    case 'space-around':
      return yoga.JUSTIFY_SPACE_AROUND;
    case 'space-between':
      return yoga.JUSTIFY_SPACE_BETWEEN;
    case 'space-evenly':
      return yoga.JUSTIFY_SPACE_EVENLY;
    case 'flex-start':
      return yoga.JUSTIFY_FLEX_START;
    case 'flex-end':
      return yoga.JUSTIFY_FLEX_END;
  }
}

function positionValue(value) {
  switch (value) {
    case 'absolute':
      return yoga.POSITION_TYPE_ABSOLUTE;
    default:
      return yoga.POSITION_TYPE_RELATIVE;
  }
}

function directionValue(value) {
  switch (value) {
    case 'ltr':
      return yoga.DIRECTION_LTR;
    case 'rtl':
      return yoga.DIRECTION_RTL;
    case 'inherit':
      return yoga.DIRECTION_INHERIT;
  }
}

function alignValue(value) {
  switch (value) {
    case 'auto':
      return yoga.ALIGN_AUTO;
    case 'center':
      return yoga.ALIGN_CENTER;
    case 'stretch':
      return yoga.ALIGN_STRETCH;
    case 'flex-start':
      return yoga.ALIGN_FLEX_START;
    case 'flex-end':
      return yoga.ALIGN_FLEX_END;
    case 'space-between':
      return yoga.ALIGN_SPACE_BETWEEN;
    case 'space-around':
      return yoga.ALIGN_SPACE_AROUND;
    case 'baseline':
      return yoga.ALIGN_BASELINE;
  }
}

function pointValue(value) {
  return value;
}

function displayValue(value) {
  switch (value) {
    case 'flex':
      return yoga.DISPLAY_FLEX;
    case 'none':
      return yoga.DISPLAY_NONE;
  }
}
