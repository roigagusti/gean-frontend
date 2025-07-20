import { Budget } from "@contexts/builder/budget/domain/Budget";
import { Concept } from "@contexts/builder/concept/domain/Concept";
import { ConceptGroup } from "@contexts/builder/concept_group/domain/ConceptGroup";
import { Engagement } from "@contexts/builder/engagement/domain/Engagement";
import { Industrial } from "@contexts/builder/industrial/domain/Industrial";
import { Project } from "@contexts/builder/project/domain/Project";
import { Strategy } from "@contexts/builder/strategy/domain/Strategy";
import { Template } from "@contexts/builder/template/domain/Template";
import { DeliveryNote } from "@contexts/order/delivery_note/domain/DeliveryNote";
import { Order } from "@contexts/order/order/domain/Order";
import { Store } from "@tanstack/store";

export const PageStore = new Store({
  selectedProject: null as Project | null,
  selectedBudget: null as Budget | null,
  selectedConcept: null as Concept | null,
  selectedConceptIds: [] as string[],
  selectedConceptGroup: null as ConceptGroup | null,
  selectedEngagement: null as Engagement | null,
  selectedIndustrial: null as Industrial | null,
  selectedTemplate: null as Template | null,
  selectedOrder: null as Order | null,
  selectedDeliveryNote: null as DeliveryNote | null,
  selectedStrategy: null as Strategy | null,
});

export const setSelectedProject = (project: Project | null) => {
  PageStore.setState((state) => ({
    ...state,
    selectedProject: project,
    selectedConcept: null,
    selectedConceptGroup: null,
    selectedEngagement: null,
    selectedIndustrial: null,
    selectedBudget: null,
    selectedOrder: null,
    selectedDeliveryNote: null,
    selectedStrategy: null,
  }));
};

export const setSelectedBudget = (budget: Budget | null) => {
  PageStore.setState((state) => ({
    ...state,
    selectedBudget: budget,
    selectedConcept: null,
    selectedConceptGroup: null,
    selectedEngagement: null,
    selectedIndustrial: null,
    selectedConceptIds: [],
    selectedOrder: null,
    selectedDeliveryNote: null,
    selectedStrategy: null,
  }));
};

export const setSelectedConcept = (concept: Concept | null) => {
  PageStore.setState((state) => ({
    ...state,
    selectedConcept: concept,
    selectedConceptGroup: concept ? null : state.selectedConceptGroup,
    selectedEngagement: concept ? null : state.selectedEngagement,
    selectedIndustrial: concept ? null : state.selectedIndustrial,
  }));
};

export const setSelectedConceptGroup = (conceptGroup: ConceptGroup | null) => {
  PageStore.setState((state) => ({
    ...state,
    selectedConceptGroup: conceptGroup,
    selectedConcept: conceptGroup ? null : state.selectedConcept,
    selectedEngagement: conceptGroup ? null : state.selectedEngagement,
    selectedIndustrial: conceptGroup ? null : state.selectedIndustrial,
  }));
};

export const setSelectedConceptIds = (conceptIds: string[]) => {
  PageStore.setState((state) => ({ ...state, selectedConceptIds: conceptIds }));
};

export const setSelectedEngagement = (engagement: Engagement | null) => {
  PageStore.setState((state) => ({ ...state, selectedEngagement: engagement }));
};

export const setSelectedIndustrial = (industrial: Industrial | null) => {
  PageStore.setState((state) => ({ ...state, selectedIndustrial: industrial }));
};

export const setSelectedTemplate = (template: Template | null) => {
  PageStore.setState((state) => ({ ...state, selectedTemplate: template }));
};

export const setSelectedOrder = (order: Order | null) => {
  PageStore.setState((state) => ({ ...state, selectedOrder: order }));
};

export const setSelectedDeliveryNote = (deliveryNote: DeliveryNote | null) => {
  PageStore.setState((state) => ({ ...state, selectedDeliveryNote: deliveryNote }));
};

export const setSelectedStrategy = (strategy: Strategy | null) => {
  PageStore.setState((state) => ({ ...state, selectedStrategy: strategy }));
};

export const clearPageStore = () => {
  PageStore.setState((state) => ({
    ...state,
    selectedConcept: null,
    selectedConceptIds: [],
    selectedConceptGroup: null,
    selectedEngagement: null,
    selectedIndustrial: null,
    selectedOrder: null,
    selectedDeliveryNote: null,
    selectedStrategy: null,
  }));
};
