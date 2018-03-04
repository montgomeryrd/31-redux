import React from 'react';
import {connect} from 'react-redux';
import {categoryCreate} from '../../actions/category-actions.js';
import CategoryForm from '../category-form/category-form.js';
import CategoryItem from '../category-item/category-item.js';

class Dashboard extends React.Component {
    render() {
        return (
            <section>
                <h1>Expenses</h1>

                <CategoryForm
                    buttonText='CREATE'
                    onComplete={this.props.createCategoryItem}/>

                {this.props.categories ?
                    this.props.categories.map(cat =>
                        <CategoryItem category={cat}/>)
                    :
                    undefined
                }
            </section>
        );
    }
}

const mapStateToProps = state => ({
    categories: state,
});

const mapDispatchToProps = (dispatch, getState) => ({
    createCategoryItem: category => dispatch(categoryCreate(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);