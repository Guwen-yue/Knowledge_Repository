# llm 怎么预测下一个词
## transformer 架构
llm最重要的工作，走进llm 的内部，看模型拿到token后怎么去处理的，经历了什么，去做词的预测（输出）。

## Token 词源
用户输入的Prompt （自然语言） 分割为多个token ，每个token转成一个tokenid ，这些tokenid就是模型的输入
编码器 将 词编码转为 tokenid    decode解码器 结果 返回给我们
大模型处理的最小单位不一定是完整的“词”，可能是子词，字符甚至是标点。用词源 能更精准的表达他是模型计算和计费的通用最小单位，而非语言学意义上的词
unhappiness 词  词源？ un happi ness
llm通常不会把他当成一个完整的词，而是将其分解为多个词源。
tokenization token ization
如果之人完整的词，模型需要记住几十个英文单词和几百万个中文词汇
计算量太大了，把词切成子词，模型只需要掌握几万个基础积木（词源）

token查找表，size就不会那么大，运算效率高
openai 事实标准，国内又qween

中文"我爱人工智能，自然语言处理很有趣"
[“我”“爱”“人工智能”“，”“自然语言处理”“很”“有趣”]

把词源理解为llm的货币
发一段文字给llm ，比如 你 - >tokenid
llm只会做一件事，预测下一个词
你 -> tokenid - > llm -> tokenid  -> 好

中国的首都是  -> llm -> 北京92%  ，北平4% ，长安 概率
tokenids(词源变成数字，没有意义) ->embedding（语义向量）
llm 内部除了token 查找表，还通过预训练，embedding 存储
一本字典tokenid 索引部分 某个词源在第几页
这个词源的语义向量，某一页大书特书 存在神经网络结构中
基于“中国首都是"前面的输入，给出后面这些词汇 的词的概率出来
北京就生成 预测一个，接下来生成 ， 
自回归生成  预测下一个词，下一个词，下一个词...

## Embedding 
语义向量 pre-trained神经元
第一步：用tokenid（数字表达） 变成了一个embedding 坐标 
你-> tokenid （57668）没有任何含义  
不能通过这个编号，加减乘除计算得到好的编号，
想要你 -> 好  是要高维向量空间中距离比较经近?4
语义 + 距离计算 
向量是多维空间里的一个坐标点 ， 向量是有方向的。 计算距离
语义相近的词，他们的embedding 向量距离比较近

第二步：查找embedding(1024) ，计算**语义距离**
llm 把编号查表转成一个高维的向量，这个过程就叫embedding，
llm内部有个巨大的向量查找表  Embedding Matrix 

模型拿到 Token ID 57688 “你” 就直接去57688的柜子里 ，把对应的向量“抽出来”

国王 王后 这两个点的距离 ，接近
国王 - 男性的向量 + 女性的向量 = 王后 向量的计算和语义的迁移

苹果 很远
模型的训练就是会这样的集合结构和空间坐标系。

## 位置编码
“我咬了狗”
“狗咬了我”
光有语义的理解还不够，相同的四个字，顺序不一样，表达的意思不一样。
顺序 当前上下文非常重要
embedding 不携带位置信息，我们就给每个向量叠加一个位置编码（position encoding PE）,告诉llm ，这个词属于句子的第几个。

每个token 携带两类信息；语义信息（是什么），位置信息（在哪里）

##  
  不只光靠一个词源的向量
  it ? 代词，向量计算？ 根据上下文将animal 的语义 给他 
the animal didn't cross the streey. because it was too tired.
it 指代 animal ，还是street?
llm 引用的机制叫 self-attention(自注意力)
Q Query 代词 我在找什么？
K key 我能提供什么 名片   
V 我能贡献什么内容 

animal  也可以拆成qky
Q  
K
V 具体的特征细节

苹果手机 
Q我吃了苹果

it 这个query 向量和句子里每一个词的key向量做一个点积运算，得到一组注意力分数，分数越高，就说明两个词相关性越强，

token1: animal -> （q1,k1,v1） 
token2:it -> （q1,k1,v1）
score =(Q2 * K1)
score =(Q2 * K3)
score1数值高，说明it 指代 animal