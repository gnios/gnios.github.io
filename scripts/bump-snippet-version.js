const fs = require('fs')
const { execSync } = require('child_process')
const path = require('path')

const stagedFiles = execSync('git diff --name-only --cached').toString().trim().split('\n')

const snippets = stagedFiles.filter((f) => f.startsWith('data/snippets/') && f.endsWith('.mdx'))

for (const file of snippets) {
  const filePath = path.join(process.cwd(), file)
  let content = fs.readFileSync(filePath, 'utf8')

  const versionMatch = content.match(/^version:\s*'(\d+)\.(\d+)\.(\d+)'/m)
  if (!versionMatch) continue

  const [, major, minor, patch] = versionMatch
  const newVersion = `${major}.${minor}.${parseInt(patch) + 1}`
  content = content.replace(/^version:\s*'\d+\.\d+\.\d+'/m, `version: '${newVersion}'`)

  fs.writeFileSync(filePath, content, 'utf8')
  execSync(`git add "${file}"`)

  console.log(`${file}: bumped to ${newVersion}`)
}
