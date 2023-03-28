import { useRef, useState } from "react";
import styled from "styled-components";

const LI = styled.li`
&.on {
    color: #888;
    text-decoration: line-through;
}
`

const App = () => {
    const [list, setList] = useState([]);

    const [itm, setItm] = useState({
        title:''
        //에러 없앨려고 title:'' 넣음
    });

    const num = useRef(1);
    //setItm의 id를 1씩 증가시키기 위해

    const onChange = e => {
        const { value, name } = e.target
        //setItm(e.target.value)
        setItm({
            id: num.current,
            //num ref 가져올때는 current
            [name]: value,
            done: false
        })
    }

    const onClick = () => {
        if (itm.title.length < 2) {
            alert('더 입력')
            return
        }

        setList([
            ...list,
            itm
        ]);

        setItm({
            title: '',
        })

        num.current++;
        //id를 1씩 증가해서 고유한 번호 만들기
    }



    //삭제 기능 만들기
    const onDelete = (id) => {
        alert('삭제하시겠습니까?')
        //console.log(id) id는 매개변수 이름은 아무거나 (it.id) 이거임

        //id 와 같은 것을 제외한 새로운 배열을 만들어서 list를 바꿔준다
        const r = list.filter(it => it.id !== id);
        //filter 가 새배열을 만들고 it.id 와 id가 같지 않은것을 뺀 배열을 만들어준다 삭제효과/ !== (아닌것)
        setList(r)
    }


    //수정 기능
    const onModify = (id) => {
        console.log(id);
        const r = list.map(it => it.id === id ? { ...it, done: true } : it);
        setList(r)
    }



    console.log(list)
    return (
        <div>
            <ul>
                {
                    list.map(it => {
                        return (
                            <LI key={it.id} className={it.done ? 'on' : ''}>
                                {it.title}
                                <button onClick={() => onDelete(it.id)}>delete</button>
                                <button onClick={() => onModify(it.id)}>do</button>
                                {/* 매개변수 바로 실행되지 않게 () => */}
                            </LI>
                        )
                    })
                }
            </ul>
            <input type="text" name='title' value={itm.title} onChange={onChange} />
            <button onClick={onClick}>write</button>
        </div>
    )
}

export default App;

//list.push(4) 이렇게도 쓰는데 잘 안씀
//* 알맹이만 늘여놓는거 ... 스프레드연산자