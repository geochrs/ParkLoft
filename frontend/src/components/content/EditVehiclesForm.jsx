import { useState, useEffect, useRef } from 'react';
import { useFetcher } from 'react-router-dom';
import classes from './EditVehiclesForm.module.css';
import getApiUrl from '../../utils/getApiUrl';
import LoadingIndicator from '../layout/LoadingIndicator';

export function EditVehiclesForm() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const fetcher = useFetcher();
  const inputRef = useRef();

  useEffect(() => {
    async function fetchVehicles() {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/vehicles`, { credentials: 'include' });
      const json = await res.json();
      setVehicles(json || []);
      setLoading(false);
    }
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (fetcher.state === 'submitting') {
      setUpdating(true);
      if (inputRef.current) inputRef.current.value = '';
    }
  }, [fetcher.state]);

  useEffect(() => {
    if (fetcher.data && fetcher.state === 'idle') {
      if (fetcher.data.actionType === 'create') {
        setVehicles((prev) => [...prev, fetcher.data.vehicle]);
      }
      if (fetcher.data.actionType === 'update') {
        setVehicles((prev) =>
          prev.map((v) =>
            v.vehicle_id === fetcher.data.vehicle.vehicle_id
              ? fetcher.data.vehicle
              : v
          )
        );
        setEditingId(null);
      }
      if (fetcher.data.actionType === 'delete') {
        const deletedId = parseInt(fetcher.data.deletedId, 10);
        setVehicles((prev) => prev.filter((v) => v.vehicle_id !== deletedId));
      }
      setUpdating(false);
    }
  }, [fetcher.data, fetcher.state]);

  return (
    <div className={classes.form}>
      <h2 className={classes.title}>Manage your Vehicles</h2>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {updating ? (
            <LoadingIndicator />
          ) : (
            <div className={classes.table}>
              <div className={`${classes.tableRow} ${classes.tableHeader}`}>
                <div>Plate Number</div>
                <div className={classes.actionsTitle}>Actions</div>
              </div>

              {vehicles.length === 0 ? (
                <p className={classes.message}>No vehicles added.</p>
              ) : (
                vehicles.map((vehicle) => (
                  <div className={classes.tableRow} key={vehicle.vehicle_id}>
                    {editingId === vehicle.vehicle_id ? (
                      <fetcher.Form
                        method="put"
                        action="/vehicles"
                        className={classes.inlineForm}
                      >
                        <input
                          type="hidden"
                          name="vehicleId"
                          value={vehicle.vehicle_id}
                        />
                        <div className={classes.inputGroup}>
                          <input
                            type="text"
                            name="licensePlate"
                            defaultValue={vehicle.licensePlate}
                            maxLength={7}
                          />
                        </div>
                        <div className={classes.buttonGroup}>
                          <button type="submit" className={classes.saveButton}>
                            Save
                          </button>
                          <button
                            type="button"
                            className={classes.cancelButton}
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </fetcher.Form>
                    ) : (
                      <>
                        <div>{vehicle.licensePlate}</div>
                        <div className={classes.buttonGroup}>
                          <button
                            type="button"
                            className={classes.editButton}
                            onClick={() => setEditingId(vehicle.vehicle_id)}
                          >
                            Edit
                          </button>
                          <fetcher.Form
                            method="delete"
                            action="/vehicles"
                            className={classes.inlineForm}
                          >
                            <input
                              type="hidden"
                              name="vehicleId"
                              value={vehicle.vehicle_id}
                            />
                            <button
                              type="submit"
                              className={classes.deleteButton}
                            >
                              Delete
                            </button>
                          </fetcher.Form>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          <fetcher.Form
            method="post"
            action="/vehicles"
            className={classes.addForm}
          >
            <div className={classes.inputGroup}>
              <label htmlFor="licensePlate">License Plate</label>
              <input
                id="licensePlate"
                type="text"
                name="licensePlate"
                ref={inputRef}
                maxLength={7}
              />
            </div>
            <div className={classes.actions}>
              <button type="submit">
                {fetcher.state === 'submitting' ? 'Saving...' : 'Save Vehicle'}
              </button>
            </div>
          </fetcher.Form>
        </>
      )}
    </div>
  );
}
