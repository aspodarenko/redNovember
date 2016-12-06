var React = require('react');
import styles from './menuList.scss';
var classNames = require('classnames/bind');
var cx = classNames.bind(styles);

class MenuList extends React.Component {
    render() {
        const result = this.props.list.map((item) => {
                let itemClass = cx({
                    selected: this.props.selectedItemId == item.id
                });
                let boundItemClick = this.props.selectItem.bind(this, item.id);
                return <li className={itemClass} key={item.id} onClick={boundItemClick}>
                    {item.name}
                </li>
            }
        );
        return (
            <ul className={styles.menu}>
                {result}
            </ul>
        );
    }
}
;

export default MenuList;