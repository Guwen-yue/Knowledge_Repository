FROM elasticsearch:8.17.0

# 安装 IK 中文分词器插件，版本必须与 ES 版本完全一致
RUN elasticsearch-plugin install --batch \
  https://release.infinilabs.com/analysis-ik/stable/elasticsearch-analysis-ik-8.17.0.zip
