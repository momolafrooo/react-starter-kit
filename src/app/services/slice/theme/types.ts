import { themes } from '../../../../styles/theme/themes';

export type ThemeKeyType = keyof typeof themes | 'system';

export interface ThemeState {
  selected: ThemeKeyType;
}
