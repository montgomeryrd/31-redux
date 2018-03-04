import React from 'react';
import {connect} from 'react-redux';
import {renderIf} from '../../lib/utils.js';
import {categoryUpdate, categoryDelete} from '../../actions/category-actions.js';
import CategoryForm from '../category-form/category-form.js';

class CategoryItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            category: this.props.category ? this.props.category : undefined,
        };

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }

    handleUpdate(category) {
        this.props.updateCategoryItem(category);
        this.setState({update: false});
    }

    handleDelete() {
        this.props.deleteCategoryItem(this.props.category);
    }

    render(){
        return(
            <div className={this.state.update === true ? 'update' : 'item'}
                key={this.props.category._id} 
                onDoubleClick={() => this.setState({update: !this.state.update})}>
                <h2>{this.props.category.title}</h2>
                <p>${this.props.category.budget}</p>
                <h3>{this.props.category.timestamp.toString()}</h3>
                {renderIf(this.state.update === true,
                    <CategoryForm
                        category={this.props.category}
                        buttonText='UPDATE'
                        onComplete={this.handleUpdate}/>
                )}

                <button type="button" value={this.props.category._id} onClick={this.handleDelete}>REMOVE</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    categories: state,
});

const mapDispatchToProps = (dispatch, getState) => ({
    updateCategoryItem: category => dispatch(categoryUpdate(category)),
    deleteCategoryItem: category => dispatch(categoryDelete(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);