import { branch, renderComponent } from 'recompose';
import { withRouter } from 'react-router-dom';
import { Loading } from './Loading';
import { isNotEmptyOrNull } from './utils/objectUtils';
import { Error } from './Error';

const passivelyRefetching = networkStatus =>
  networkStatus === 2 || networkStatus === 6;

export const displayLoadingState = ({
  onLoadMore = true,
  onPassiveRefetch = true,
  onPassiveRefetchOnly = false,
  onCacheLoadOnlyQueryName = null,
} = {}) =>
  branch(props => {
    if (!props.data) return false;
    if (onCacheLoadOnlyQueryName) {
      if (props.data[onCacheLoadOnlyQueryName]) {
        return false;
      }
    }
    if (
      !passivelyRefetching(props.data.networkStatus) &&
      onPassiveRefetchOnly
    ) {
      return false;
    }
    if (onLoadMore === false && props.data.networkStatus === 3) {
      return false;
    }
    if (passivelyRefetching(props.data.networkStatus) && !onPassiveRefetch) {
      return false;
    }
    return props.data && props.data.loading;
  }, renderComponent(Loading));

export const displayErrorState = branch(
  props => isNotEmptyOrNull(props.data) && isNotEmptyOrNull(props.data.error),
  renderComponent(withRouter(Error))
);

export const displayLoadingStateQueries = queriesNames =>
  branch(
    props =>
      isNotEmptyOrNull(
        queriesNames.filter(
          queryName => props[queryName] && props[queryName].loading
        )
      ),
    renderComponent(Loading)
  );
