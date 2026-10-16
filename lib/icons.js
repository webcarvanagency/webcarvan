import {
  Award,
  ChartColumn,
  CodeXml,
  Database,
  Flame,
  Globe,
  Heart,
  Layers,
  Lightbulb,
  Megaphone,
  Monitor,
  Palette,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Target,
  Users,
  Zap,
  Clock,
  Headphones,
  TrendingUp,
} from "lucide-react";

export const icons = {
  code: CodeXml,
  shopping: ShoppingBag,
  megaphone: Megaphone,
  chart: ChartColumn,
  search: Search,
  pen: PenTool,
  rocket: Rocket,
  lightbulb: Lightbulb,
  target: Target,
  smartphone: Smartphone,
  monitor: Monitor,
  palette: Palette,
  database: Database,
  flame: Flame,
  store: Store,
  globe: Globe,
  layers: Layers,
  shield: ShieldCheck,
  zap: Zap,
  users: Users,
  heart: Heart,
  award: Award,
  sparkles: Sparkles,
  clock: Clock,
  headphones: Headphones,
  trending: TrendingUp,
};

export const iconOptions = Object.keys(icons);

export function Icon({ name, ...props }) {
  const Component = icons[name] || Sparkles;
  return <Component {...props} />;
}
