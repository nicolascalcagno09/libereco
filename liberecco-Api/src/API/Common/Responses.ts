import * as _ from 'lodash';
import { error } from '../Common/Result';
import InvalidProductCode from '../Application/Exceptions/InvalidProductCode';
import UnauthorizedException from '../Application/Exceptions/UnauthorizedException';
import RequiredFieldException from '../Application/Exceptions/RequiredFieldException';
import ProductsFoundException from '../Application/Exceptions/ProductsFoundException';
import NotFoundEntityException from '../Application/Exceptions/NotFoundEntityException';
import DuplicatedEntryException from '../Application/Exceptions/DuplicatedEntryException';
import InvalidArgumentException from '../Application/Exceptions/InvalidArgumentException';
import ActionNotAllowedException from '../Application/Exceptions/ActionNotAllowedException';
import PreconditionRequiredException from '../Application/Exceptions/PreconditionRequiredException';
import NotFoundPermissionWarehouse from '../Application/Exceptions/NotFoundPermissionWarehouse';
import ForbiddenWarehouseException from '../Application/Exceptions/ForbiddenWarehouseException';
import ProcessTypeNotAssignedException from '../Application/Exceptions/ProcessTypeNotAssignedException';
import InvalidWarehouseDestinyCalendar from '../Application/Exceptions/InvalidWarehouseDestinyCalendar';
import NotDeleteForeignKey from '../Application/Exceptions/NotDeleteForeignKey';
import UserRegistrationInputExistException from '../Application/Exceptions/UserRegistrationInputExistException';
import UserRegistrationOutputExistException from '../Application/Exceptions/UserRegistrationOutputExistException';
import UserRegistrationWithoutOutputException from '../Application/Exceptions/UserRegistrationWithoutOutputException';
import ProductNewStoreException from '../Application/Exceptions/ProductNewStoreException';
import SameRequestInAShortPeriod from '../Application/Exceptions/SameRequestInAShortPeriod';
import InvalidContainerCode from '../Application/Exceptions/InvalidContainerCode';
import TypeEnumIdNotExistException from '../Application/Exceptions/TypeEnumIdNotExistException';
import StoppedServiceException from '../Application/Exceptions/StoppedServiceException';
import ExceededNumberException from '../Application/Exceptions/ExceededNumberException';

const ER_DUP_ENTRY = 1062;
const ER_ROW_IS_REFERENCED_2 = 1451;
const ER_NO_REFERENCED_ROW_2 = 1452;

const responses = async (e, response) => {
  if (e instanceof InvalidArgumentException) {
    return await response.status(400).json(
      error(e.message, e.name, 400),
    );
  } else if (e instanceof ExceededNumberException) {
    return await response.status(400).json(
        error(e.message, e.name, 400),
    );
  } else if (e instanceof RequiredFieldException) {
    return await response.status(400).json(
        error(e.message, e.name, 400),
    );
  } else if (e instanceof SameRequestInAShortPeriod) {
    return await response.status(403).json(
      error(e.message, e.name, 403),
    );
  } else if (e instanceof ProcessTypeNotAssignedException) {
    return response.status(400).json(
      error(e.message, e.name, 400),
    );
  } else if (e instanceof UnauthorizedException) {
    return await response.status(401).json(
      error(e.message, e.name, 401),
    );
  } else if (e instanceof ForbiddenWarehouseException) {
    return await response.status(403).json(
      error(e.message, e.name, 403),
    );
  } else if (e instanceof NotFoundEntityException) {
    return await response.status(404).json(
      error(e.message, e.name, 404),
    );
  } else if (e instanceof ActionNotAllowedException) {
    return await response.status(405).json(
      error(e.message, e.name, 405),
    );
  } else if (e instanceof ProductsFoundException) {
    return response.status(422).json(
      error(e.message, e.name, 422),
    );
  } else if (e instanceof InvalidProductCode) {
    return response.status(422).json(
      error(e.message, e.name, 422),
    );
  } else if (e instanceof InvalidContainerCode) {
    return response.status(422).json(
      error(e.message, e.name, 422),
    );
  } else if (e instanceof InvalidWarehouseDestinyCalendar) {
    return await response.status(422).json(
      error(e.message, e.name, 422),
    );
  } else if (e instanceof PreconditionRequiredException) {
    return await response.status(428).json(
      error(e.message, e.name, 428),
    );
  } else if (e.errno && e.errno === ER_ROW_IS_REFERENCED_2) {
    const exErr = new NotDeleteForeignKey(e.message);
    return await response.status(exErr.httpStatus).json(
      error(exErr.message, exErr.name, exErr.httpStatus),
    );
  } else if (e instanceof UserRegistrationWithoutOutputException) {
    return await response.status(429).json(
      error(e.message, e.name, 429),
    );
  } else if (e instanceof UserRegistrationInputExistException) {
    return await response.status(430).json(
      error(e.message, e.name, 430),
    );
  } else if (e instanceof UserRegistrationOutputExistException) {
    return await response.status(431).json(
      error(e.message, e.name, 431),
    );
  } else if (e instanceof NotFoundPermissionWarehouse) {
    return response.status(428).json(
      error(e.message, e.name, 428),
    );
  } else if (e.errno && e.errno === ER_DUP_ENTRY) {
    const exErr = new DuplicatedEntryException(e.message);
    return await response.status(exErr.httpStatus).json(
      error(exErr.message, exErr.name, exErr.httpStatus),
    );
  } else if (e instanceof ProductNewStoreException) {
    return response.status(422).json(
      error(e.message, e.name, 422),
    );
  } else if (e instanceof TypeEnumIdNotExistException) {
    return response.status(433).json(
      error(e.message, e.name, 433),
    );
  } else if (e instanceof StoppedServiceException) {
    return response.status(405).json(
      error(e.message, e.name, 405),
    );
  } else if ( typeof e.getHttpStatus === 'function' && e.getHttpStatus ){
      return response.status(e.getHttpStatus()).json(
        error(e.message, e.name, e.getHttpStatus() ),
      );
  }else if ( typeof e.statusCode !== 'undefined' ){
    return response.status(e.statusCode).json(
      error(e.message, e.message, e.statusCode )
    );
  }else{
    return response.status(400).json(
      error(e.message,'Default error', 400)
    );
  }
};

export default responses;
