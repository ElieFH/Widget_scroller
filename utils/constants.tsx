import { Calculator } from '@/components/Widgets/calculator';
import { ImageFlipper } from '@/components/Widgets/image-flipper';
import { Weather } from '@/components/Widgets/weather';

export const WidgetType = Object.freeze({
  CALCULATOR: 'CALC',
  WEATHER: 'WEATHER',
  FLIPPER: 'FLIP',
});

export const WidgetElement = Object.freeze({
  [WidgetType.CALCULATOR]: Calculator,
  [WidgetType.WEATHER]: Weather,
  [WidgetType.FLIPPER]: ImageFlipper,
});

export const WidgetTypeKey = Object.freeze({
  [WidgetType.CALCULATOR]: 0,
  [WidgetType.WEATHER]: 1,
  [WidgetType.FLIPPER]: 2,
});

export const WidgetIconName = Object.freeze({
  [WidgetType.CALCULATOR]: "calculator",
  [WidgetType.WEATHER]: "cloud",
  [WidgetType.FLIPPER]: "interaction",
});