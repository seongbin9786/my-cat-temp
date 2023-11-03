// update(newProps) 호출로 re-render가 가능한 객체
export class Component {

    // protected를 의도함
    // private class field를 사용할 수 없음.
    state;
    props;
    $current;
    
    // private을 의도함
    /**
     * @type {Map<Component, Component>}
     */
    #childrenMap;

    constructor(props) {
        // 현재 props 갱신
        this.props = props;

        // 이렇게 하면 배열 형태는 re-render가 불가능함
        // 상관 없을지도??
        this.#childrenMap = new Map(); 
    }

    // protected를 의도함
    // 신규 요소 반환할 책임 있음.
    // Template Method Pattern
    _render() {
        throw new Error('컴포넌트는 _render() 매소드를 구현해야 합니다.');
    }

    // protected를 의도함
    setState(nextState) {
        // merge state 방식으로 수행
        this.state = {
            ...this.state,
            ...nextState
        };

        const firstRender = this.$current === null;
        if (firstRender) {
            return this.render();
        }

        // 본인의 상태가 변경될 때도 update 하되 기존 props 재사용
        this.update(this.props);
    }

    // 부모가 첫 렌더링을 할 때는 render() 호출한다.
    // 생성한 Element를 반환해 mount를 위임함
    render() {
        const $rendered = this._render();
        
        // 현재 Element 갱신
        this.$current = $rendered;

        return $rendered;
    }

    // 부모가 re-render를 할 때 새 props로 update()를 호출해줘야 한다.
    // 생성한 Element를 직접 mount한다.
    // TODO: 부모가 update()를 호출했을 때 반환값이 있는 경우: 기존 위치가 없는데 가능함? --> 부모가 알아서 해야지
    update(newProps) {
        // 현재 props 갱신
        this.props = newProps;

        const { $current } = this;

        // 직전의 render()가 null을 반환했던 경우: 첫 render()를 수행한다.
        if (!$current) {
            return this.render();
        }

        // 부모를 받지 않아도 스스로 획득할 수 있다.
        const $parent = $current.parentElement;

        const $next = this._render();

        // render의 결과가 null인 경우: 초기화한다.
        if ($next === null) {
            $parent.removeChild($current);
            this.$current = null;
            return;
        }

        $parent.replaceChild($next, $current);

        // 현재 Element 갱신
        this.$current = $next;
    }

    /**
     * 자식이 Component인 경우 기존 instance를 접근하는 방법 제공
     * 
     * @param {Component} component 
     * @param {object} props 
     * @returns {Component} 
     */
    renderChildInstance(component, props) {
        // 최초 1회만 생성함
        // 한계: 중복 종류의 자식 사용 불가능
        if (!this.#childrenMap.has(component)) {
            const newComponent = new component(props);
            this.#childrenMap.set(component, newComponent);

            return newComponent.render();
        }

        const oldComponent = this.#childrenMap.get(component);
        oldComponent.update(props);
    }
}
