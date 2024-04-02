class TrieNode {
    public children: Record<string, TrieNode> = {}
    public isEnd: boolean = false
}

export class Trie {
    private node: TrieNode = new TrieNode()

    public insert(words: string[]) {
        words.forEach(word => {
            let node = this.node
            for (let i = 0; i < word.length; i++) {

                if (!node.children[word[i]])
                    node.children[word[i]] = new TrieNode()

                if (i === word.length - 1)
                    node.children[word[i]].isEnd = true

                node = node.children[word[i]]
            }
        })
    }

    public findsByPrefix(prefix: string): string[] {
        let currentNode = this.node
        const words: string[] = []
        for (let i = 0; i < prefix.length; i++) {
            if (!currentNode.children[prefix[i]])
                break;

            if (i === prefix.length - 1 && currentNode.children[prefix[i]].isEnd)
                words.push(prefix)

            currentNode = currentNode.children[prefix[i]]
        }

        const findWords = (node: TrieNode, segment: string) => {
            Object.entries(node.children).forEach(([char, tNode]) => {
                if (tNode.isEnd) words.push(prefix + segment + char)
                findWords(tNode, segment + char)
            })
        }

        findWords(currentNode, "")

        return words
    }

    public findFirstByPrefix(prefix: string): string | undefined {
        let currentNode = this.node
        for (let i = 0; i < prefix.length; i++) {
            if (!currentNode.children[prefix[i]])
                return undefined

            if (i === prefix.length - 1 && currentNode.children[prefix[i]].isEnd)
                return ""

            currentNode = currentNode.children[prefix[i]]
        }

        const findSingleWord = (node: TrieNode, segment: string): string | undefined => {
            const childrens = Object.entries(node.children)
            for (let i=0; i < childrens.length; i++) {
                const [char, tNode] = childrens[i]
                if (tNode.isEnd) return segment + char
                return findSingleWord(tNode, segment + char)
            }
            return undefined
        }

        return findSingleWord(currentNode, "")
    }
}