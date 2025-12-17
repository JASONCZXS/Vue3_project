export interface MenusType {
// 菜单标题 问号表示可有可无
  name: string;
  path: string;
  label: string;
  icon?: string;
  url?: string;
  meta?: any;
  // 子菜单
  children?: MenusType[];
}