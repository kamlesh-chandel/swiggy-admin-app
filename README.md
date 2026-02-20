# Swiggy Admin Dashboard

## Overview

Swiggy Admin Dashboard is a production-style admin panel built to manage a food delivery platform.
This application enables platform administrators to manage restaurants, food items, users, and orders through a clean and scalable admin interface.

The project is built to simulate a real-world SaaS admin system and fulfills the milestone requirements of building an admin app using modern React, TypeScript, and API-driven architecture.

---

## Tech Stack

### Frontend

* React (Vite + TypeScript)
* MUI (Material UI)
* Recharts (charts & dashboard analytics)
* React Router

### Backend / Data Layer

* Sanity CMS (schemas, data storage, APIs)

### Tooling & Code Quality

* ESLint
* Prettier
* Husky (pre-commit hooks)
* pnpm

---

## Features

### Authentication & Roles

* Role-based access system
* Two roles:

  * Super Admin
  * Admin
* Protected routes
* Permission-based UI rendering

---

## Dashboard

The dashboard provides a quick overview of platform performance.

### Metrics

* Total users
* Total orders
* Total revenue
* Cancelled orders

### Charts (on dashboard)

* Top 5 Users by total spending
* Order status distribution (delivered, pending, cancelled)
* Top 5 Restaurants by total orders

---

## Restaurants Management

* View restaurants in table
* Search restaurants
* Sorting & pagination
* Add new restaurant
* Edit restaurant
* Delete restaurant (super admin only)

---

## Food Items Management

* View food items
* Search food items
* Filter by restaurant
* Sorting & pagination
* Add food item
* Edit food item
* Delete food item
* Bulk create food items

---

## Orders Management

* View all orders
* Search orders
* Filter by status
* Sorting & pagination
* Update order status
* Cancel order (permission-based)
* Order detail view

---

## Users Management

* View users list
* Search users
* Sorting & pagination
* View user order history
* View total spending
* Block/unblock user (permission-based)

---

## Admin Management (Super Admin Only)

* View all admins
* Search admins
* Add new admin
* Edit admin permissions
* Disable admin
* Role assignment

---

## Permission System

Permissions are assigned by the super admin.

Available permissions for admin:

* manageRestaurants
* manageFoodItems
* manageOrders
* cancelOrders
* viewUsers
* blockUsers
* viewAnalytics

Dependency rules:

* blockUsers requires viewUsers
* cancelOrders requires manageOrders

Super admin always has full access.

---

## Table Features

All main modules use a common data table with:

* client-side pagination
* Sorting
* Search
* Filtering
* Loading states

Built using MUI DataGrid.

---

## Advanced Concepts Implemented

* Role-based access control (RBAC)
* Reusable table component
* client-side search/filter/sort/pagination
* Theme toggle (dark/light)
* Modular folder architecture
* Permission-based UI rendering

---

## Goal of Project

This project demonstrates the architecture and functionality of a real-world admin panel used in food delivery platforms.
It focuses on scalability, maintainability, and professional frontend engineering practices.
