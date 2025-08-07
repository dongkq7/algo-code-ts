/**
 * 公司的每个员工都符合 Employee 类的描述。整个公司的人员结构可以看作是一 标准的、没有环的多叉树。树的头节点是公司唯一的老板。除老板之外的每个员工都有唯一的直接上级。
 * 叶节点是没有任何下属的基层员工(subordinates列表为空)，除基层员工外，每个员工都有一个或多个直接下级。
 * 这个公司现在要办party，你可以决定哪些员工来，哪些员工不来。但是要遵循如下规则。
 * 1 如果某个员工来了，那么这个员工的所有直接下级都不能来
 * 2 派对的整体快乐值是所有到场员工快乐值的累加
 * 3 你的目标是让派对的整体快乐值尽量大
 * 给定一棵多叉树的头节点boss，请返回派对的最大快乐值
 */
class Employee {
  happy: number // 这名员工可以带来的快乐值
  subordinates: Employee[] // 这名员工有哪些直接下级

  constructor(happy: number) {
    this.happy = happy
    this.subordinates = []
  }
}

function maxHappy(boss: Employee) {
  const [happy1, happy2] = process(boss)
  return Math.max(happy1, happy2)
}

// 返回数组中第一个值代表该员工在来的情况下的最大快乐值，第二个值代表在不来情况下的最大快乐值
function process(x: Employee) {
  if (!x.subordinates.length) {
    return [x.happy, 0]
  }
  let happy1 = x.happy
  let happy2 = 0

  for (const e of x.subordinates) {
    const [val1, val2] = process(e)
    // 该员工来时快乐值 = 其快乐值+直接下级不来时的快乐值
    happy1 += val2
    // 该员工不来时快乐值 = 0 + 直接下级来与不来情况下的快乐值中的最大值
    happy2 += Math.max(val1, val2)
  }
  return [happy1, happy2]
}

const boss = new Employee(10)
const be1 = new Employee(20)
const be2 = new Employee(30)
const be3 = new Employee(30)
boss.subordinates[0] = be1
boss.subordinates[1] = be2
boss.subordinates[2] = be3
const ee1 = new Employee(40)
const ee2 = new Employee(50)
const ee3 = new Employee(60)
be1.subordinates[0] = ee1
be2.subordinates[0] = ee2
be3.subordinates[0] = ee3

console.log(maxHappy(boss))
