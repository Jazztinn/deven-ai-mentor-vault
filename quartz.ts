import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { literalCurrency } from "./quartz/literal-currency"

const config = await loadQuartzConfig()
config.plugins.transformers.unshift({
  name: "LiteralCaptionCurrency",
  textTransform: (_ctx, source) => literalCurrency(source),
})
export default config
export const layout = await loadQuartzLayout()
