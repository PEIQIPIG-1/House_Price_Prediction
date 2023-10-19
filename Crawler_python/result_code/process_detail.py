import pandas as pd
import json


df = pd.read_excel('result.xlsx')

# 将 JSON 数据加载为 Python 字典
df['attr'] = df['attr'].apply(lambda x: json.loads(x))

# 提取所有的键
all_keys = set()
for row in df['attr']:
    all_keys.update(row.keys())
print(all_keys)
# 使用 Pandas 创建新的 DataFrame，列名为键，填充数据
for key in all_keys:
    df[key] = df['attr'].apply(lambda x: x.get(key, ''))

# 删除原始 'attr' 列
# df = df.drop(columns=['attr'])
# 保存结果到新的 CSV 文件
df.to_csv('test.csv', index=False)
