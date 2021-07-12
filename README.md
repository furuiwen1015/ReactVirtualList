# @xinqingnian/react-virtual-list

[![](https://img.shields.io/badge/dynamic/json?color=red&label=Github&query=%24.data.totalSubs&suffix=%20followers&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dgithub%26queryKey%3Dfuruiwen1015)](https://github.com/furuiwen1015)
[![](https://img.shields.io/badge/NPM-1.0.5-green)](https://www.npmjs.com/package/@xinqingnian/react-virtual-list)

a virtual list of React

## Install

---

```
npm install @xinqingnian/react-virtual-list --save-dev
```

## Usage

---

```
// js
import { ReactVirtualList } from '@xinqingnian/react-virtual-list'

const data = Array(1000).fill(0)

export const Demo = () => {
    return (<div>
	    <ReactVirtualList className="container">
	        {data.map((item, index) => <div key={index}>{item}</div>)}
	    </ReactVirtualList>
    </div>)
}

//css
.container {
    height: 500px;
    overflow-y: auto;
}
```
