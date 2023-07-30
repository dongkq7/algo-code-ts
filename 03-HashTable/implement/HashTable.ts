class HashTable<T = any> {
  private storage: [string, T][][] = []
  private length = 7 
  private count = 0

  private hashFun(key:string, max: number): number {
    const len = key.length
    let hashCode = 0
    for(let i = 0; i < len; i++) {
      hashCode = 31 * hashCode + key.charCodeAt(i)
    }
    return hashCode % max
  }
  // 判断容量是否为质数
  private isPrime(num: number): boolean {
    const sqrt = Math.sqrt(num)

    for(let i = 2; i <= sqrt; i++) {
      if (num % i === 0)
      return false
    }
    return true
  }
  // 获取质数的容量
  private getNextPrimeLength(num: number): number {
    let newLenth = num
    while(!this.isPrime(newLenth)) {
      newLenth++
    }
    return newLenth
  }
  // 扩容/缩容
  private resize(newLength: number) {
    // 获取最新容量
    let newPrime = this.getNextPrimeLength(newLength)
    if (newPrime < 7) {
      newPrime = 7
    }
    this.length = newPrime
    
    // 再哈希
    const oldStorage = this.storage
    this.storage = []
    this.count = 0
    oldStorage.forEach(bucket => {
      if (!bucket) return
      for(let i = 0; i < bucket.length; i++) {
        const tuple = bucket[i]
        this.put(tuple[0], tuple[1])
      }
    })

  }

  put(key: string, value: T) {
    // 获取key对应的index
    const index = this.hashFun(key, this.length)

    // 取出该index对应的bucket
    let bucket = this.storage[index]
    // 如果该位置没有bucket(undefined),那么就创建一个空数组放进去
    if (!bucket) {
      bucket = []
      this.storage[index] = bucket
    }

    // 该位置的bucket中是否已经存在了这个key
    let isUpdate = false
    for(let i = 0; i < bucket.length; i ++) {
      const tuple = bucket[i]
      // 找到了同key的元组，更新数据
      if (tuple[0] === key) {
        tuple[1] = value
        isUpdate = true
        return
      }
    }
    //  该数据是新添加的数据，添加到bucket中
    if (!isUpdate) {
      bucket.push([key, value])
      this.count ++

      // 装填因子>0.75则进行扩容
      const loadFactor = this.count / this.length
      if (loadFactor > 0.75) {
        this.resize(this.length * 2)
      }
    }
  }

  get(key: string): T | undefined {
    const index = this.hashFun(key, this.length)
    const bucket = this.storage[index]

    if (!bucket) {
      return undefined
    }

    for(let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i]

      if (tuple[0] === key) {
        return tuple[1]
      }
    }
    return undefined
  }

  delete(key: string): T | undefined {
    const index = this.hashFun(key, this.length)
    const bucket = this.storage[index]

    if (!bucket) {
      return undefined
    }

    for(let i = 0; i < bucket.length; i ++) {
      const tuple = bucket[i]
      if (tuple[0] === key) {
        bucket.splice(i, 1)
        this.count--
        // 装填因子 < 0.25则进行缩容
        const loadFactor = this.count / this.length
        if (loadFactor < 0.25 && this.length > 7) {
          this.resize(Math.floor(this.length / 2))
        }
        return tuple[1]
      }
    }
    return undefined
  }
}


export default HashTable