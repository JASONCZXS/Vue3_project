import Mock from "mockjs";
import type { MallGoodsType } from "@/type/malltype";

function buildGoodsList(): MallGoodsType[] {
  const { list } = Mock.mock({
    "list|12": [
      {
        id: "@guid",
        name: "@ctitle(4, 10)",
        desc: "@cparagraph(1)",
        price: "@float(19, 1999, 2, 2)",
        stock: "@integer(0, 999)",
        cover: '@image("600x400", "@color", "#FFF", "Goods")',
        "tags|1-3": ["@ctitle(2, 4)"],
      },
    ],
  }) as { list: MallGoodsType[] };

  return list;
}

export default {
  getGoodsList: () => {
    return {
      code: 200,
      message: "success",
      data: {
        list: buildGoodsList(),
      },
    };
  },
};

