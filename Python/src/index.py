# 引数をリストに格納する
import sys
args = sys.argv[1:]


if len(args) < 2 or len(args) > 4:
    raise Exception('正しい表示形式ではありません。CIDR形式と他の形式を混在させることはできません。')
