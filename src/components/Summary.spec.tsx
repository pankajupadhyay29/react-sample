import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import 'mocha';
import * as React from 'react';
import { Provider } from 'react-redux';
import { initialState, setStoreStudents } from '../store/reducer';
import { store } from '../store/store';
import { Student } from '../store/types';
import Summary from './Summary';

describe('Summary', () => {
  let wrapper: ReactWrapper;
  const students = [
    { id: 1, name: 'Std1', marks: 80 },
    { id: 2, name: 'Std2', marks: 60 },
  ];

  beforeEach(() => {
    wrapper = mount((
      <Provider store={store}>
        <Summary />
      </Provider>
    ));
  });

  afterEach(() => {
    const emptyStudent: Student[] = [];
    store.dispatch(setStoreStudents(emptyStudent));
  });

  it('should render the summary card', () => {
    expect(wrapper.find('div.card')).to.have.length(1);
  });

  it('should have header text "Summary"', () => {
    expect(wrapper.find('div.card-header').text()).to.be.eq('Summary');
  });

  it('should have three card title', () => {
    expect(wrapper.find('div.card-title')).to.have.length(3);
  });

  describe('Maximum', () => {
    it('should render Maximum title', () => {
      expect(wrapper.find('div.card-title').first().text()).to.be.eq('Maximum');
    });

    it('should render zero initially', () => {
      expect(wrapper.find('div.card-text').first().text()).to.be.eq('0');
    });

    it('should update maximum correctly', () => {
      store.dispatch(setStoreStudents(students));
      expect(wrapper.find('div.card-text').first().text()).to.be.eq('80');
    });
  });

  describe('Minimum', () => {
    it('should render Minimum title', () => {
      expect(wrapper.find('div.card-title').at(1).text()).to.be.eq('Minimum');
    });

    it('should render zero initially', () => {
      expect(wrapper.find('div.card-text').at(1).text()).to.be.eq('0');
    });

    it('should update minimum correctly', () => {
      store.dispatch(setStoreStudents(students));
      expect(wrapper.find('div.card-text').at(1).text()).to.be.eq('60');
    });
  });

  describe('Average', () => {
    it('should render Average title', () => {
      expect(wrapper.find('div.card-title').last().text()).to.be.eq('Average');
    });

    it('should render zero initially', () => {
      expect(wrapper.find('div.card-text').last().text()).to.be.eq('0');
    });

    it('should update average correctly', () => {
      store.dispatch(setStoreStudents(students));
      expect(wrapper.find('div.card-text').last().text()).to.be.eq('70');
    });
  });
});
